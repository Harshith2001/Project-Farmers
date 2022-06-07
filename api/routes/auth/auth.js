import { compareSync } from "bcrypt";
import { Router } from "express";
import credentialModel from "../../models/credentialModel.js";
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
      jsonwebtoken.sign(payload, "secret", { expiresIn: 1800 }, (err, token) => {
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
export default router;
