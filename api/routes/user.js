/// <reference types="express"/>

import { Router } from "express";
import userModel from "../models/userModel.js";
import myPassport from "../util/passport.js";

// Routes - "/api/user/"
const router = Router();
router.use(myPassport.initialize());

const isAuthorized = async (req, res, next) => {
  await userModel.find({ userId: myPassport.id }).then((user) => {
    if (user[0].userId !== req.params.id) {
      return res.status(403).send("Forbidden");
    }
    next();
  });
};
// For testing purpose only should be removed during deployment
router.get("/", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
  console.log(myPassport.user);
  userModel.find({}).then((data) => res.json(data));
});

// route for get api is /api/user/id
router.get("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
  userModel.find({ userId: req.params.id }).then((data) => res.json(data));
});

router.put("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
  userModel
    .findOneAndUpdate({ userId: req.params.id }, req.body)
    .then(res.status(201).json({ success: true }));
});
export default router;
