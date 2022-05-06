/// <reference types="express"/>

import { Router } from "express";
import { exit } from "process";
import userModel from "../models/userModel.js";
import credentialModel from "../models/credentialModel.js";
import {hashSync} from "bcrypt";
import passport from "passport";
import myPassport from "../util/passport.js";

// Routes - "/api/user/"
const router = Router();
router.use(passport.initialize());
// For testing purpose only should be removed during deployment
router.get("/", passport.authenticate('jwt',{session:false}),(req, res) => {
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
	let profile = new userModel({
		userId: req.body.userId,
		userType: req.body.userType,
		name: req.body.name,
		email: req.body.email,
		mobile: req.body.mobile,
		city: req.body.city,
		location: req.body.location,
	});
	let credentials = new credentialModel({
		userId: req.body.userId,
		password: hashSync(req.body.password, 10),
	});
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
	await credentials.save();
	res.status(201).json(profile);}
});

// route for get api is /api/user/id
router.get("/:id", (req, res) => {
	userModel.find({userId: req.params.id}).then((data) => res.json(data));
});

router.put("/:id", (req, res) => {
	userModel.findOneAndUpdate({userId: req.params.id}, req.body).then(res.status(201).json({ success: true}));
});
export default router;
