/// <reference types="express"/>

import { Router } from "express";
import userModel from "../models/userModel.js";
import myPassport from "../util/passport.js";

// Routes - "/api/user/"
const router = Router();
router.use(myPassport.initialize());

const isAuth = (req, res, next) => {
  const auth = req.header("Authorization");

  if (auth) {
    myPassport.authenticate("jwt", { session: false })(req, res, next);
  } else {
    next();
  }
};


const isAllowed = async (req, res, next) => {
  let utype;
  await userModel
    .find({ userId: req.params.id })
    .then((user) => {
      utype = user[0].userType;
    })
    .catch((err) => {
      console.log(err);
    });

  if (utype !== "farmer") {
    await userModel
      .find({ userId: myPassport.id })
      .then((user) => {
        if (user[0].userId !== req.params.id) {
          return res.status(403).send("Forbidden");
        }
        next();
      })
      .catch((err) => {
        return res.status(403).send("Forbidden");
      });
  } else {
    next();
  }
};

const isAuthorized = async (req, res, next) => {
  await userModel.find({ userId: myPassport.id }).then((user) => {
    if (user[0].userId !== req.params.id) {
      return res.status(403).send("Forbidden");
    }
    next();
  });
};
// For testing purpose only should be removed during deployment
router.get("/", (req, res) => {
  userModel.find({}).then((data) => res.json(data));
});

// route for get api is /api/user/id
router.get("/:id", isAuth, isAllowed, (req, res) => {
  userModel.find({ userId: req.params.id }).then((data) => res.json(data));
});

router.put("/:id", myPassport.authenticate("jwt", { session: false }), isAuthorized, (req, res) => {
  userModel
    .findOneAndUpdate({ userId: req.params.id }, req.body)
    .then(res.status(201).json({ success: true }));
});
export default router;
