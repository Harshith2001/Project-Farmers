import { Router } from "express";
import database from "../util/database.js";
import crypto from "crypto";

const router = Router();
const productDb = new database("./databases/product.json");
const productDbData = productDb.read();
router.get("/", (req, res) => {
	const products = [];
	for (let i = 0; i < productDbData.data.length; i++) {
		if (productDbData.data[i].quantity > 0) {
			products.push(productDbData.data[i]);
		}
	}
	res.json(products);
});

router.post("/", (req, res) => {
	const product = {
		productId: crypto.randomUUID(),
		userId: req.body.userId,
		cropName: req.body.cropName,
		quantity: req.body.quantity,
		price: req.body.price,
	};
	productDbData.data.push(product);
	productDb.write(productDbData);
	res.status(201).json(productDb);
});

router.get("/:id", (req, res) => {
	const products = [];
	let userName = req.params.id;
	for (let i = 0; i < productDbData.data.length; i++) {
		if (productDbData.data[i].userId === userName) {
			products.push(productDbData.data[i]);
		}
	}
	res.json(products);
});
export default router;
