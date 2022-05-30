import { Router } from "express";
import priceModel from "../models/priceModel";

const router = Router();
router.get("/:id", async (req, res) => {
	let price = {};
	await priceModel.find({ cropName: req.params.id }).then((data) => (price = data));
	res.status(200).json(price);
});

export default router;
