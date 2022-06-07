import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true });
let connection = mongoose.connection;

connection.on("connected", function () {
  console.log("database is connected successfully");
});
connection.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
connection.on("error", console.error.bind(console, "connection error:"));

export default connection;
