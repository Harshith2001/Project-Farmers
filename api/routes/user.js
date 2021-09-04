/// <reference types="express"/>

import { Router } from "express";
import database from "../util/database.js";

// Routes - "/api/user/"
const router = Router();

// if only, the user is authenticated, then the user can access the route
// router.use((req, res, next) => {
// 	if (req.session.userId) {
// 		next();
// 	} else {
// 		res.json({
// 			success: false,
// 			message: "You are not authenticated",
// 		});
// 	}
// });

const profileDb = new database("./databases/profile.json");
const dbData = profileDb.read();
router.get("/", (req, res) => {
	res.json(dbData.data);
});

//Post Methods
router.post("/", (req, res) => {
	const profile = {
		userId: req.body.userId,
		userType: req.body.userType,
		name: req.body.name,
		email: req.body.email,
		mobile: req.body.mobile,
		city: req.body.city,
	};
	dbData.data.push(profile);
	// console.log(oldData);
	profileDb.write(dbData);
	res.status(201).json(profileDb);
});

// route for get api is /api/profile/id
router.get("/:id", (req, res) => {
	let a = dbData.data.find((user) => user.userId === req.params.id);
	res.json(a);
});

export default router;
