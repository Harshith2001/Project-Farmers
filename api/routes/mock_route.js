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
  }
});

router.get("/shipping", (req, res) => {
  shipModel
    .aggregate([
      {
        $addFields: {
          purchaseId: { $toObjectId: "$purchaseId" },
          customerId: { $toObjectId: "$customerId" },
        },
      },
      {
        $lookup: {
          from: "purchases",
          localField: "purchaseId",
          foreignField: "_id",
          as: "purchases",
        },
      },
      { $unwind: "$purchases" },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customers",
        },
      },
      { $unwind: "$customers" },
      {
        $project: {
          customer: {
            customerName: "$customers.customerName",
            email: "$customers.email",
            phone: "$customers.phone",
            city: "$customers.city",
            purchaseOrder:{
              purchaseId: "$purchases._id",
              customerId: "$customers._id",
              productName: "$purchases.productName",
              pricing: "$purchases.pricing",
              mrp: "$purchases.mrp",
              quantity: "$purchases.quantity",
              shipmentDetails:{
                shipmentId: "$_id",
                address: "$address",
                city: "$city",
                state: "$state",
              }
            }
          }
        },
      },
    ])
    .then((data) => res.json(data));
});

export default router;
