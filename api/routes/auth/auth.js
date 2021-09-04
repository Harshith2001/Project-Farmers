import { Router } from "express";
import database from "../../util/database.js";

// Github Copilot
// Route - "/auth/"
const router = Router();

const userDb = new database("./databases/profile.json");
const authDb = new database("./databases/auth.json");
let userData = userDb.read();
let authData = authDb.read();

// Route - "/auth/login"
router.post("/login", (req, res) => {
	// get body which has userId and password
	const { userId, password } = req.body;

	// check if userId is in database
	if (authData.data.find((users) => users.userId === userId)) {
		// check if password is correct
		if (authData.data.find((users) => users.userId === userId).password === password) {
			// if correct, send userId
			req.session.userId = userId;
			req.session.save();
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
	// check if userId and password are in body
	if (!req.body.userId && !req.body.password) {
		// if not, send error
		res.json({
			success: false,
			message: "UserId and password are required",
		});
	} else {
		var auth_user = {
			userId: req.body.userId,
			password: req.body.password,
		};
		var newUser = {
			name: req.body.name,
			userId: req.body.userId,
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
	}
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
