import { Router } from "express";

// Route - "/auth/"
const router = Router();

router.post("/user", (req, res) => {
	res.send("auth");
});

router.get("/user/:id", (req, res) => {
	res.send(req.params.id);
});

export default router;
