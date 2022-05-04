import { Router } from "express";
import productModel from "../models/productModel.js";

const router = Router();

// router.use((req, res, next) => {
// 	if (req.session.userId) {
// 		next();
// 	} else {
// 		res.json({
// 			success: false,
// 			message: "You are not authenticated",
// 		});
// 	}
// });


// Get all products
router.get("/", (req, res) => {
	productModel.find({availableQuantity: {$gt:0}}).then((data) => res.json(data));
});

router.post("/",(req, res) => {
	let product = new productModel(req.body);
	product.save();
	res.status(201).json({ success: true, data: product });
});

// For getting all the products of a particular user
router.get("/:id", (req, res) => {
	productModel.find({userId: req.params.id}).then((data) => res.json(data));
});

// Note: This method is written by Github Copilot
// For deleting the product
router.delete("/:id", (req, res) => {
	productModel.findByIdAndRemove(req.params.id).then((data) => res.json(data));
});

router.put("/:id", (req, res) => {
	productModel.findByIdAndUpdate(req.params.id, req.body).then(res.status(201).json({ success: true}));
}
);

export default router;
