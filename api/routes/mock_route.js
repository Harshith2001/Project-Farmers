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
          $group: {
            _id: "$_id",
            customerName: { $first: "$customerName" },
            email: { $first: "$email" },
            phone: { $first: "$phone" },
            city: { $first: "$city" },
            purchaseOrders: { $push: "$purchases" },
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
        {
          $group: {
            _id: "$_id",
            customerName: { $first: "$customerName" },
            email: { $first: "$email" },
            phone: { $first: "$phone" },
            city: { $first: "$city" },
            purchaseOrders: { $push: "$purchases" },
          },
        },
      ])
      .then((data) => res.json(data));
  }
});

router.get("/shipping", async (req, res) => {
  let x = await customerModel.aggregate([
    {
      $addFields: {
        customerId: { $toString: "$_id" },
      },
    },
    {
      $lookup: {
        from: "purchases",
        localField: "customerId",
        foreignField: "customerId",
        as: "purchaseOrder",
      },
    },
    { $unwind: "$purchaseOrder" },
    {
      $addFields: {
        purchaseId_temp: { $toString: "$purchaseOrder._id" },
      },
    },
    {
      $lookup: {
        from: "shippings",
        localField: "purchaseId_temp",
        foreignField: "purchaseId",
        as: "purchaseOrder.shipmentDetail",
      },
    },
    {
      $group: {
        _id: "$customerId",
        customerName: { $first: "$customerName" },
        email: { $first: "$email" },
        phone: { $first: "$phone" },
        city: { $first: "$city" },
        purchaseOrder: { $push: "$purchaseOrder" },
      },
    },
  ]);

  res.json(x);
});

export default router;
