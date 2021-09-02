import { Router } from "express";
import database from "../util/database.js";
import crypto from "crypto";

const router = Router();

router.use((req, res, next) => {
	if (req.session.userId) {
		next();
	} else {
		res.json({
			success: false,
			message: "You are not authenticated",
		});
	}
});

const productDb = new database("./databases/product.json");
const productDbData = productDb.read();
// Get all products
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
	res.status(201).json({ success: true, data: product });
});

// For getting all the products of a particular user
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

// Note: This method is written by Github Copilot
// For deleting the product
router.delete("/:id", (req, res) => {
	let productId = req.params.id;
	for (let i = 0; i < productDbData.data.length; i++) {
		if (productDbData.data[i].productId === productId) {
			productDbData.data.splice(i, 1);
		}
	}
	productDb.write(productDbData);
	res.json(productDb);
});

export default router;
