import { Router } from "express";
import demandModel from "../models/demandModel.js";
const router = Router();

router.get("/:id", (req, res) => {
  demandModel.findOne({ cropName: req.params.id }).then((data) => res.json(data));
});

router.post("/", (req, res) => {
  let demandData = new demandModel(req.body);
  demandData.save((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.status(200).json({
        message: "Success",
        data: data,
      });
    }
  });
});

export default router;
