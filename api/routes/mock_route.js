import { Router } from "express";
import customerModel from "../models/customerModel.js";
import purchaseModel from "../models/purchaseModel.js";
import shipModel from "../models/shipModel.js";
const router = Router();

router.post("/customer/", (req, res) => {
  let customer = new customerModel(req.body);
  customer.save().then((data) => res.json(data));
});

router.post("/purchase/", (req, res) => {
  let purchase = new purchaseModel(req.body);
  if (req.body.mrp < req.body.pricing) {
    return res.status(400).send("Pricing cannot be greater than MRP");
  } else {
  purchase.save().then((data) => res.json(data));
  }
});

router.post("/ship/", (req, res) => {
  let ship = new shipModel(req.body);
  ship.save().then((data) => res.json(data));
});

router

export default router;
