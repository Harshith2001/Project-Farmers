import { Router } from "express";
import priceModel from "../models/priceModel.js";

const router = Router();
router.get("/:id", async (req, res) => {
  let price = 0;
  // await priceModel.find({ cropName: req.params.id }).then((data) => (price = data));
  await priceModel.findOne({ cropName: req.params.id }).then((data) => {
    price = data.price * req.query.quantity;
  });
  console.log(price, req.query.quantity, req.params.id);
  res.status(200).json(price);
});

export default router;
