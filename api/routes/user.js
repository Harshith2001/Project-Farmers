/// <reference types="express"/>

import { Router } from "express";
import database from "../util/database.js";
// Routes - "/api/user/"
const router = Router();
const profileDb = new database("./databases/profile.json");

router.get("/", (req, res) => {
	let x = profileDb.read();
	res.json(x.data);
});

//Post Methods
router.post("/", (req, res) => {
	const profile = {
		userId: req.body.id,
		userType: req.body.userType,
		name: req.body.name,
		email: req.body.email,
		mobile: req.body.mobile,
		city: req.body.city,
	};
	//console.log("post req got: " + req.url);
	let oldData = JSON.parse(profileDb.read());
	let newData = oldData.data.push(profile);
	profileDb.write(newData);
	res.status(201).json(profileDb);
});

// route for get api is /api/profile/id
router.get("/:id", (req, res) => {
	let a = profileDb.find((user) => user.id === req.params.id);
	res.json(a);
	console.log(req.query);
	console.log(typeof req.params.id);
});

export default router;
