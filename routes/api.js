import { Router } from "express";
import productsRoutes from "./productRoutes.js"
import userRoutes from "./userRoutes.js"
import orderRoutes from "./orderRoutes.js"

const router = Router()

router.use("/menu",productsRoutes)
router.use("/user",userRoutes)
router.use("/orders",orderRoutes)

export default router;

// ALL ROUTING KOMMER LÄGGAS TILL HÄR

// ROUTING-struktur ska se ut såhär: router.use("/prefix",prefixRoutes) PREFIX = namnet/nästa moment

//ORDERS 

