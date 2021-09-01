import { Router } from "express";

// Route - "/auth/"
const router = Router();

router.get("/login", (req, res) => {
	// get body which has userId and password
	const { userId, password } = req.body;

	// check if userId and password are valid
	if (userId === "admin" && password === "admin") {
		// if valid, set session
		req.session.userId = userId;
		res.json({
			success: true,
			message: "login success",
		});
	}

	// if not valid, return error
	res.json({
		success: false,
		message: "login failed",
	});
});

// Route - "/auth/logout"
// sign up the user
router.post("/signup", (req, res) => {
	if (!req.body.id || !req.body.password) {
		res.status("400");
		res.send("Invalid details!");
	} else {
		var newUser = { id: req.body.id, password: req.body.password };
		Users.push(newUser);
		req.session.user = newUser;
		res.redirect("/protected_page");
	}
});

// logout
router.get("/logout", (req, res) => {
	// delete session
	req.session.destroy();
	res.json({
		success: true,
	});
});

export default router;
