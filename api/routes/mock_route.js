import { Router } from "express";
import demandModel from "../models/demandModel.js";
const router = Router();

router.get("/:id", (req, res) => {
  demandModel.findOne({ cropName: req.params.id }).then((data) => res.json(data));
});

router.post("/", (req, res) => {});

export default router;
