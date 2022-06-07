import mongoose from "mongoose";
import connection from "../util/connection.js";
connection;
let priceSchema = new mongoose.Schema({
  cropName: String,
  price: Number,
});

let priceModel = mongoose.model("Price", priceSchema);
export default priceModel;
