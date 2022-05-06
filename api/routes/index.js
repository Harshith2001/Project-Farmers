import { Router } from "express";
import user from "./user.js";
import product from "./product.js";
import orders from "./orders.js";
import price from "./price.js";
import auth from "./auth/auth.js";
const router = Router();

router.use("/user", user);
router.use("/product", product);
router.use("/orders", orders);
router.use("/price", price);
router.use("/auth", auth);

export default router;
