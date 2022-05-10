import { Router } from "express";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import { ObjectId } from "mongodb";
import axios from "axios";
import fetch from "node-fetch";

const router = Router();
const objectId = ObjectId;
// Irrespective of user type this api will return orders made by the user for the faster data retrievel to filed such as fUserId and eUserId are used.
// fuserid or euserid or order id is used to retrieve the orders.
router.get("/:id", (req, res) => {
	if (req.params.id.length == 24) {
		orderModel
			.find({
				$or: [{ fUserId: req.params.id }, { eUserId: req.params.id }, { _id: new objectId(req.params.id) }],
			})
			.then((data) => res.json(data));
	} else {
		orderModel
			.find({ $or: [{ fUserId: req.params.id }, { eUserId: req.params.id }] })
			.then((data) => res.json(data));
	}
});

router.post("/", async (req, res) => {
	let availableQuantity;
	await productModel.findById(req.body.productId).then((data) => (availableQuantity = data.availableQuantity));
	if (availableQuantity < req.body.quantity) {
		res.json({
			success: false,
			message: "Required quantity is less than available quantity",
		});
	} else {
		let order = new orderModel(req.body);
		let credentials = await axios.post("http://localhost:3100/api/auth/login", {
			userId: "admin",
			password: "Pupa@123",
		});
		// await axios
		// 	.put(
		// 		`http://localhost:3100/api/product/admin/${req.body.productId}`,
		// 		{ availableQuantity: availableQuantity - req.body.quantity, admin: true },
		// 		{
		// 			headers: {
		// 				"Authorization": credentials.data.token,
		// 				"content-type": "text/json",
		// 			},
		// 		}
		// 	)
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		await fetch(`http://localhost:3100/api/product/admin/${req.body.productId}`, {
			method: "PUT",
			body: JSON.stringify({
				availableQuantity: availableQuantity - req.body.quantity,
			}),
			headers: {
				Authorization: credentials.data.token,
				"content-type": "application/json",
			},
		}).catch((err) => {
			console.log(err);
		});
		await order.save();
		res.status(201).json({ success: true, data: order });
	}
	//have to update the available quantity of the product in product model.
});

export default router;
