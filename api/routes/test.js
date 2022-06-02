import { Router } from "express";
import priceModel from "../models/priceModel.js";
const router = Router();

router.get("/", (req, res) => {
	res.json("Hello World");
});

router.post("/", (req, res) => {
	let price = new priceModel(req.body);
	price.save().then((data) => res.json(data));
});

export default router;
