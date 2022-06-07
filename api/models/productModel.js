import mongoose from "mongoose";
import connection from "../util/connection.js";
connection;
let productSchema = new mongoose.Schema({
  userId: String,
  cropName: String,
  quantity: Number,
  availableQuantity: Number,
  price: String,
});

let productModel = mongoose.model("Product", productSchema);
export default productModel;
