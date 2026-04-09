import { Router } from "express";
import productsRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js"
import db from "../data/db.js";

const router = Router();

router.use("/menu", productsRoutes);
router.use("/user", userRoutes);
router.use("/orders",orderRoutes)

export default router;

