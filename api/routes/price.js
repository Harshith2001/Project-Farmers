import { Router } from "express";
import priceModel from "../models/priceModel.js";

const router = Router();
router.get("/:id", async (req, res) => {
  let priceObject = {};
  // await priceModel.find({ cropName: req.params.id }).then((data) => (price = data));
  await priceModel.findOne({ cropName: req.params.id }).then((data) => {
    priceObject.price = data.price * req.query.quantity;
    priceObject.pricePerKg = data.price;
  });
  res.status(200).json(priceObject);
});

export default router;
