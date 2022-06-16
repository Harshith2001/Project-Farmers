// It also saves the product supply totals in the database

import mongoose from "mongoose";
import connection from "../util/connection.js";
connection;
let demandSchema = new mongoose.Schema({
  cropName: String,
  demandDataObject: Object,
  productSupplyTotals: Number,
  orderDemandTotals: Number,
});

let demandModel = mongoose.model("Demand", demandSchema);
export default demandModel;
