import { Router } from "express";
import database from "../util/database.js";
import crypto from "crypto";

const router = Router();
const ordersDb = new database("./databases/orders.json");
const productDb = new database("./databases/product.json");
const productDbData = productDb.read();
const ordersDbData = ordersDb.read();

// Irrespective of user type this api will return orders made by the user for the faster data retrievel to filed such as fUserId and eUserId are used.

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
		orderId: crypto.randomUUID(),
		fUserId: req.body.fUserId,
		eUserId: req.body.eUserId,
		productId: req.body.productId,
		cropName: req.body.cropName,
		quantity: req.body.quantity,
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
