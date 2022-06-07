import { compareSync } from "bcrypt";
import { Router } from "express";
import credentialModel from "../../models/credentialModel.js";
import userModel from "../../models/userModel.js";
import { hashSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
// Github Copilot
// Route - "/auth/"
const router = Router();

// Route - "/auth/login"
router.post("/login", (req, res) => {
  // get body which has userId and password
  const { userId, password } = req.body;

  credentialModel.findOne({ userId }).then((data) => {
    if (!data) {
      res.json({
        success: false,
        message: "User not found",
      });
    } else if (!compareSync(password, data.password)) {
      res.json({
        success: false,
        message: "Incorrect password",
      });
    } else {
      const payload = {
        userId: userId,
        id: data._id,
      };
      jsonwebtoken.sign(payload, "secret", { expiresIn: 18000 }, (err, token) => {
        if (err) {
          console.log(err);
          res.json({
            success: false,
            message: "Error signing token",
          });
        } else {
          res.json({
            success: true,
            message: "Login successful",
            token: "Bearer " + token,
          });
        }
      });
    }
  });
});

router.post("/register", async (req, res) => {
  let err = 0;
  //Have to add constraints to check if the username or email or mobile is already present
  await userModel.find({ userId: req.body.userId }).then((data) => {
    if (data.length > 0) {
      err = 1;
    }
  });
  await userModel.find({ email: req.body.email }).then((data) => {
    if (data.length > 0) {
      err = 2;
    }
  });
  await userModel.find({ mobile: req.body.mobile }).then((data) => {
    if (data.length > 0) {
      err = 3;
    }
  });
  let profile = new userModel({
    userId: req.body.userId,
    userType: req.body.userType,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city || "Mysore",
    location: req.body.location || ["12.3", "23.4"],
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

    let token = jsonwebtoken.sign(
      {
        userId: credentials.userId,
        id: credentials._id,
      },
      "secret",
      { expiresIn: 18000 }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: "Bearer " + token,
    });
  }
});

export default router;
