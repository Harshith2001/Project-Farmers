import { Router } from "express";
import productModel from "../models/productModel.js";
import myPassport from "../util/passport.js";
import userModel from "../models/userModel.js";
import priceAlgorithm from "../util/priceAlgorithm.js";
import priceModel from "../models/priceModel.js";
import orderModel from "../models/orderModel.js";
import demandModel from "../models/demandModel.js";

const router = Router();
router.use(myPassport.initialize());

const isAuthorized = async (req, res, next) => {
  await userModel
    .find({ userId: myPassport.id })
    .then(async (user) => {
      let myProduct;
      await productModel.findById(req.params.id).then((product) => {
        myProduct = product;
      });
      if (user[0].userId !== myProduct.userId) {
        return res.status(403).send("Forbidden");
      }
      next();
    })
    .catch((err) => {
      return res.status(403).send("Forbidden");
    });
};

const isAllowed = async (req, res, next) => {
  await userModel
    .find({ userId: myPassport.id })
    .then((user) => {
      if (user[0].userId !== req.body.userId || user[0].userType !== "farmer") {
        return res.status(403).send("Forbidden");
      }
      next();
    })
    .catch((err) => {
      return res.status(403).send("Forbidden");
    });
};

// Get all products
router.get("/", (req, res) => {
  productModel.find({ availableQuantity: { $gt: 0 } }).then((data) => res.json(data));
});

router.post("/", myPassport.authenticate("jwt", { session: false }), isAllowed, async (req, res) => {
  let product = new productModel(req.body);

  let demandData = await demandModel.findOne({ cropName: req.body.cropName });
  if (demandData !== null) {
    demandData.productSupplyTotals += parseInt(req.body.quantity);
  } else {
    let data = {
      cropName: req.body.cropName,
      productSupplyTotals: parseInt(req.body.quantity),
      demandDataObject: {},
      orderDemandTotals: 0,
    };
    demandData = new demandModel(data);
  }
  demandData.save((err) => console.log(err));

  if (demandData.productSupplyTotals >= 2000 && demandData.orderDemandTotals > 0) {
    const price = new priceAlgorithm(req.body.cropName, demandData.demandDataObject);
    let newPrice = price.priceCalculator();
    await priceModel.findOneAndUpdate({ cropName: req.body.cropName }, { $set: { price: newPrice } });
    await demandModel.findOneAndUpdate({ cropName: req.body.cropName }, { $set: { productSupplyTotals: 0 } });
  }
  await product.save();
  res.status(201).json({ success: true, data: product, message: "Product added successfully" });
});

// For getting all the products of a particular user
router.get("/:id", (req, res) => {
  productModel.find({ userId: req.params.id }).then((data) => res.json(data));
});

// Note: This method is written by Github Copilot
// For deleting the product
router.delete("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, async (req, res) => {
  let order;
  await orderModel.find({ productId: req.params.id }).then((data) => {
    order = data;
  });
  if (order.length > 0) {
    return res.status(403).send("Can't delete the product already sold");
  } else {
    await productModel.findByIdAndRemove(req.params.id).then((data) => res.json(data));
  }
});

router.put("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
  productModel.findByIdAndUpdate(req.params.id, req.body).then(res.status(201).json({ success: true }));
});
export default router;
