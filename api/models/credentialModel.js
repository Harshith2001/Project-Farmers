import mongoose from "mongoose";
import connection from "../util/connection.js";
connection;
let credentialSchema = new mongoose.Schema({
  userId: String,
  password: String,
});

let credentialModel = mongoose.model("Credential", credentialSchema);
export default credentialModel;
