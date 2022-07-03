import mongoose from "mongoose";
import connection from "../util/connection.js";
connection;
let purchaseSchema = new mongoose.Schema({
  customerId: String,
  productName: String,
  quantity: Number,
  pricing: Number,
  mrp: Number,
});

let purchaseModel = mongoose.model("Purchase", purchaseSchema);
export default purchaseModel;
