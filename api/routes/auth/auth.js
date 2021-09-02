import { Router } from "express";
import database from "../util/database.js";

// Route - "/auth/"
const router = Router();

const userDb = new database("./databases/profile.json");
const authDb = new database("./databases/auth.json");
let userData = userDb.read();
let authData = authDb.read();

// Route - "/auth/login"
router.get("/login", (req, res) => {
	// get body which has userId and password
	const { userId, password } = req.body;

	// check if userId is in database
	if (authData.data.find((users) => users.userId === userId)) {
		// check if password is correct
		if (authData.data.find((users) => users.userId === userId).password === password) {
			// if correct, send userId
			req.session.userId = userId;
			res.json({
				success: true,
				userId: userId,
			});
		} else {
			// if incorrect, send error
			res.send({
				success: false,
				message: "Incorrect password",
			});
		}
	} else {
		// if userId is not in database, send error
		res.json({
			success: false,
			message: "UserId not found",
		});
	}
});

// Route - "/auth/signup"
// sign up the user
router.post("/signup", (req, res) => {
	var auth_user = {
		userId: req.body.userId,
		password: req.body.password,
	};
	var newUser = {
		name: req.body.name,
		userId: req.body.id,
		userType: req.body.userType,
		dateCreated: new Date(),
	};
	authData.data.push(auth_user);
	userData.data.push(newUser);

	authDb.write(authData);
	userDb.write(userData);

	req.session.userId = auth_user.userId;
	res.json({
		success: true,
		userId: auth_user.userId,
	});
});

// Route - "/auth/logout"
// logout
router.get("/logout", (req, res) => {
	// delete session
	req.session.destroy();
	res.json({
		success: true,
	});
});

export default router;
