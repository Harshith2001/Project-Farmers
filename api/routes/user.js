/// <reference types="express"/>

import { Router } from "express";
import profiles from "../data/users.js";

// Routes - "/api/user/"
const router = Router();

router.get("/", (req, res) => {
	res.json(profiles);
});

//Post Methods
router.post("/", (req, res) => {
	const profile = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		mobile: req.body.mobile,
		city: req.body.city,
	};
	profiles.push(profile);
	res.json(profile);
});

// route for get api is /api/profile/id
router.get("/:id", (req, res) => {
	let a = profiles.find((c) => c.firstName === req.params.id);
	res.json(a);
	console.log(req.query);
	console.log(typeof req.params.id);
});

export default router;
