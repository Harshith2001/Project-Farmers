import { Router } from "express";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import { ObjectId } from "mongodb";
import myPassport from "../util/passport.js";
import userModel from "../models/userModel.js";
import priceModel from "../models/priceModel.js";
import database from "../util/database.js";
import priceAlgorithm from "../util/priceAlgorithm.js";

const demandDb = new database("./databases/demand.json");
const demandDbData = demandDb.read();

const router = Router();
const objectId = ObjectId;
router.use(myPassport.initialize());

const isAuthorized = async (req, res, next) => {
	if (req.query.type === "orderId") {
		let order;
		await orderModel.findById(req.params.id).then((data) => {
			order = data;
		});
		await userModel.find({ userId: myPassport.id }).then((user) => {
			if (user[0].userId !== order.eUserId && user[0].userId !== order.fUserId) {
				return res.status(403).send("Forbidden");
			}
			next();
		});
	} else {
		await userModel.find({ userId: myPassport.id }).then((user) => {
			if (user[0].userId !== req.params.id) {
				return res.status(403).send("Forbidden");
			}
			next();
		});
	}
};

const isAllowed = async (req, res, next) => {
	await userModel.find({ userId: myPassport.id }).then((user) => {
		if (req.body.eUserId !== user[0].userId) {
			return res.status(403).send("Forbidden");
		}
		next();
	});
};

// Irrespective of user type this api will return orders made by the user for the faster data retrievel to filed such as fUserId and eUserId are used.
// fuserid or euserid or order id is used to retrieve the orders.
router.get("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
	if (req.query.type === "orderId") {
		orderModel
			.find({
				$or: [{ fUserId: req.params.id }, { eUserId: req.params.id }, { _id: new objectId(req.params.id) }],
			})
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	} else {
		orderModel
			.find({ $or: [{ fUserId: req.params.id }, { eUserId: req.params.id }] })
			.then((data) => res.json(data))
			.catch((err) => res.json(err));
	}
});

router.post("/", myPassport.authenticate("jwt", { session: false }), isAllowed, async (req, res) => {
	let product = {};
	await productModel.findById(req.body.productId).then((data) => (product = data));
	if (product.availableQuantity < req.body.quantity) {
		res.json({
			success: false,
			message: "Required quantity is less than available quantity",
		});
	} else {
		if (product.cropName in demandDbData) {
			let demandObject = demandDbData[`${product.cropName}`][0];
			if (`${req.body.bidValue}` in demandObject) {
				demandObject[`${req.body.bidValue}`] += req.body.quantity;
			} else {
				demandObject[`${req.body.bidValue}`] = req.body.quantity;
			}
			demandDbData[`${product.cropName}`][0] = demandObject;
			demandDbData[`${product.cropName}`][1] += req.body.quantity;
		} else {
			demandDbData[`${product.cropName}`] = [];
			demandDbData[`${product.cropName}`][0] = {
				[`${req.body.bidValue}`]: req.body.quantity,
			};
			demandDbData[`${product.cropName}`][1] = req.body.quantity;
		}
		demandDb.write(demandDbData);

		let price = 0;

		await priceModel.findOne({ cropName: product.cropName }).then((data) => {
			price = data.price * req.body.quantity;
		});

		if (demandDbData[`${product.cropName}`][1] >= 1000) {
			const price = new priceAlgorithm(product.cropName, demandDbData[`${product.cropName}`][0]);
			let newPrice = await price.priceCalculator();
			await priceModel.findOneAndUpdate({ cropName: product.cropName }, { $set: { price: newPrice } });
			demandDbData[`${product.cropName}`][0] = {};
			demandDbData[`${product.cropName}`][1] = 0;
			demandDb.write(demandDbData);
		}
		let order = new orderModel({
			fUserId: req.body.fUserId,
			eUserId: req.body.eUserId,
			productId: req.body.productId,
			quantity: req.body.quantity,
			price: price,
		});
		await productModel.findByIdAndUpdate(req.body.productId, {
			availableQuantity: product.availableQuantity - req.body.quantity,
		});
		await order.save();

		res.status(201).json({ success: true, data: order });
	}
	//have to update the available quantity of the product in product model.
});

export default router;
