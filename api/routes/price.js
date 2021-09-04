import { Router } from "express";
import database from "../util/database.js";
import fetch from "node-fetch";

const router = Router();
const productDb = new database("./databases/product.json");
const productDbData = productDb.read();
const profileDb = new database("./databases/profile.json");
const dbData = profileDb.read();

router.get("/:id", (req, res) => {
	let product;
	for (let i = 0; i < productDbData.data.length; i++) {
		if (productDbData.data[i].productId === req.params.id) {
			product = productDbData.data[i];
			break;
		}
	}
	let farmerData, userData;
	for (let i = 0; i < dbData.data.length; i++) {
		if (dbData.data[i].userId === product.userId) {
			farmerData = dbData.data[i];
			break;
		}
	}

	for (let i = 0; i < dbData.data.length; i++) {
		if (dbData.data[i].userId === req.query.userId) {
			userData = dbData.data[i];
			console.log("das");
			break;
		}
	}

	const PriceCal = (data) => {
		let price = product.price;
		let distance = data.routes[0].sections[0].summary.length;

		let cost;
		cost = Math.floor((distance / 100000) * 0.8 * price) + 1;

		return cost;
	};

	let url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${farmerData.location[0]},${farmerData.location[1]}&destination=${userData.location[0]},${userData.location[1]}&return=summary&apiKey=9s5tG3t92t9JLBKSySwXCWlzgj-2XnW73It4sOW13wA`;

	fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			console.log("here 1");
			return response.json();
		})
		.then((data) => {
			let x = PriceCal(data);
			res.json(x);
		})
		.catch((err) => {
			console.log(err);
		});
});

export default router;
