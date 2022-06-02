import { Router } from "express";
import productModel from "../models/productModel.js";
import myPassport from "../util/passport.js";
import userModel from "../models/userModel.js";
import database from "../util/database.js";
import priceAlgorithm from "../util/priceAlgorithm.js";
import priceModel from "../models/priceModel.js";

const demandDb = new database("./databases/demand.json");
const demandDbData = demandDb.read();

const router = Router();
router.use(myPassport.initialize());

const isAuthorized = async (req, res, next) => {
	await userModel
		.find({ userId: myPassport.id })
		.then(async (user) => {
			let myProduct;
			await productModel.findById(req.params.id).then((product) => {
				myProduct = product;
			});
			if (user[0].userId !== myProduct.userId) {
				return res.status(403).send("Forbidden");
			}
			next();
		})
		.catch((err) => {
			return res.status(403).send("Forbidden");
		});
};

const isAllowed = async (req, res, next) => {
	await userModel
		.find({ userId: myPassport.id })
		.then((user) => {
			if (user[0].userId !== req.body.userId || user[0].userType !== "farmer") {
				return res.status(403).send("Forbidden");
			}
			next();
		})
		.catch((err) => {
			return res.status(403).send("Forbidden");
		});
};

// Get all products
router.get("/", (req, res) => {
	productModel.find({ availableQuantity: { $gt: 0 } }).then((data) => res.json(data));
});

router.post("/", myPassport.authenticate("jwt", { session: false }), isAllowed, async (req, res) => {
	let product = new productModel(req.body);
	demandDbData[`${req.body.cropName}`][2] += req.body.quantity;
	demandDb.write(demandDbData);

	if (demandDbData[`${req.body.cropName}`][2] >= 2000) {
		const price = new priceAlgorithm(req.body.cropName, demandDbData[`${req.body.cropName}`][0]);
		let newPrice = price.priceCalculator();
		await priceModel.findOneAndUpdate({ cropName: req.body.cropName }, { $set: { price: newPrice } });
		demandDbData[`${req.body.cropName}`][2] = 0;
		demandDb.write(demandDbData);
	}
	await product.save();
	res.status(201).json({ success: true, data: product });
});

// For getting all the products of a particular user
router.get("/:id", (req, res) => {
	productModel.find({ userId: req.params.id }).then((data) => res.json(data));
});

// Note: This method is written by Github Copilot
// For deleting the product
router.delete("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
	productModel.findByIdAndRemove(req.params.id).then((data) => res.json(data));
});

router.put("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
	productModel.findByIdAndUpdate(req.params.id, req.body).then(res.status(201).json({ success: true }));
});
export default router;
