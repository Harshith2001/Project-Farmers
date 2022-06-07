import mongoose from "mongoose";
import connection from "../util/connection.js";
connection;
let orderSchema = new mongoose.Schema({
  fUserId: String,
  eUserId: String,
  productId: String,
  quantity: Number,
  price: String,
});

let orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
