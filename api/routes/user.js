/// <reference types="express"/>

import { Router } from "express";
import { exit } from "process";
import userModel from "../models/userModel.js";
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


// For testing purpose only should be removed during deployment
router.get("/", (req, res) => {
	userModel.find({}).then((data) => res.json(data));
});

//Post Method
router.post("/", async(req, res) => {
	let err = 0;
	//Have to add constraints to check if the username or email or mobile is already present
	await userModel.find({userId: req.body.userId}).then((data) => {
		if (data.length > 0) {
			err=1;
		}
	});
	await userModel.find({email: req.body.email}).then((data) => {
		if (data.length > 0) {
			err =2;
		}});
	await userModel.find({mobile: req.body.mobile}).then((data) => {
		if (data.length > 0) {
			err =3;
		}});
	let profile = new userModel(req.body);
	if (err == 1) {
		res.json({
			success: false,
			message: "User Id already exists",
		});
	} else if (err == 2) {
		res.json({
			success: false,
			message: "Email already exists",
		});
	} else if (err == 3) {
		res.json({
			success: false,
			message: "Mobile already exists",
		});
	} else {
	await profile.save();
	res.status(201).json(profile);}
});

// route for get api is /api/user/id
router.get("/:id", (req, res) => {
	userModel.find({userId: req.params.id}).then((data) => res.json(data));
});

export default router;
