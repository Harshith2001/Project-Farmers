import { Router } from "express";
import user from "./user.js";
import product from "./product.js";
import orders from "./orders.js";
const router = Router();

router.use("/user", user);
router.use("/product", product);
router.use("/orders", orders);

export default router;
