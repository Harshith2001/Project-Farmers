import { Router } from "express";
import user from "./user.js";
import product from "./product.js";
const router = Router();

router.use("/user", user);
router.use("/product", product);

export default router;
