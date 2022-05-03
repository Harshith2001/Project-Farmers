import { Router } from "express";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

const router = Router();
// Irrespective of user type this api will return orders made by the user for the faster data retrievel to filed such as fUserId and eUserId are used.
// fuserid or euserid or order id is used to retrieve the orders.
router.get("/:id", (req, res) => {
	const orders = [];
	for (let i = 0; i < ordersDbData.data.length; i++) {
		if (ordersDbData.data[i].fUserId === req.params.id || ordersDbData.data[i].eUserId === req.params.id) {
			orders.push(ordersDbData.data[i]);
		}
	}
	res.json(orders);
});

router.post("/", (req, res) => {
	const order = {
		fUserId: req.body.fUserId,
		eUserId: req.body.eUserId,
		productId: req.body.productId,
		quantity: req.body.quantity,
		price: req.body.price,
	};
	let a;
	for (let i = 0; i < productDbData.data.length; i++) {
		if (productDbData.data[i].productId === order.productId) {
			a = i;
			break;
		}
	}
	if (productDbData.data[a].quantity < order.quantity) {
		res.status(400).json({ success: false, message: "Required Quantity is less than Available Quantity" });
	} else {
		productDbData.data[a].quantity -= order.quantity;
		productDb.write(productDbData);
		ordersDbData.data.push(order);
		ordersDb.write(ordersDbData);
		res.status(201).json({ success: true, data: order });
	}
});

export default router;
