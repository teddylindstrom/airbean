import { Router } from "express";
import productsRoutes from "./productRoutes.js"
import userRoutes from "./userRoutes.js"

const router = Router()
router.use("/menu",productsRoutes)
router.use("/user",userRoutes)


export default router;

// ALL ROUTING KOMMER LÄGGAS TILL HÄR

// ROUTING-struktur ska se ut såhär: router.use("/prefix",prefixRoutes) PREFIX = namnet/nästa moment

//ORDERS 

