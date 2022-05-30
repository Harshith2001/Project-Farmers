import priceAlgorithm from "../util/PriceV2.js";
import { Router } from "express";
import database from "../util/database.js";

const demandDb = new database("./databases/demand.json");
const demandDbData = demandDb.read();

const router = Router();

router.get("/", (req, res) => {
	const price = new priceAlgorithm("Tomato", demandDbData["Tomato"][0]);
	price.priceCalculator();
	res.send("Hello");
});

export default router;
