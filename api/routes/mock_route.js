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

router.get("/orders", (req, res) => {
  // As mongo Atlas free tire doesn't support $cond operator, I am using if-else statement.
  if (req.query.city !== undefined) {
    customerModel
      .aggregate([
        {
          $match: {
            city: `${req.query.city}`,
          },
        },
        { $addFields: { customerId: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "purchases",
            localField: "customerId",
            foreignField: "customerId",
            as: "purchases",
          },
        },
        { $unwind: "$purchases" },
        {
          $project: {
            _id: 1,
            customerId: 1,
            customerName: 1,
            email: 1,
            phone: 1,
            city: 1,
            purchases: "$purchases",
          },
        },
      ])
      .then((data) => res.json(data));
  } else {
    console.log("No query");
    customerModel
      .aggregate([
        { $addFields: { customerId: { $toString: "$_id" } } },
        {
          $lookup: {
            from: "purchases",
            localField: "customerId",
            foreignField: "customerId",
            as: "purchases",
          },
        },
        { $unwind: "$purchases" },
        { $group: { _id:{
          customerId: "$customerId",
          customerName: "$customerName",
          email: "$email",
          phone: "$phone",
          city: "$city",
        }, purchaseOrders: { $push: "$purchases" } } },
      ])
      .then((data) => res.json(data));
  }
});

router.get("/shipping", async (req, res) => {
  let data = await purchaseModel.aggregate([
    { $addFields: { purchaseId: { $toString: "$_id" } } },
    {
      $lookup: {
        from: "shippings",
        localField: "purchaseId",
        foreignField: "purchaseId",
        as: "shippings",
      },
    },
    { $unwind: "$shippings" },
    {
      $project: {
        _id: 1,
        productName: 1,
        pricing: 1,
        mrp: 1,
        quantity: 1,
        shipping: "$shippings",
      },
    },
  ]);

  res.json(data);
});

export default router;
