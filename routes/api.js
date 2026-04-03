import { Router } from "express";
import productsRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
import db from "../data/db.js";

const router = Router();

router.use("/menu", productsRoutes);
router.use("/user", userRoutes);

router.get("/orders/status/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  const order = db
    .prepare("SELECT * FROM orders WHERE id = ?")
    .get(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const now = Date.now();
  const createdAt = new Date(order.created_at).getTime();

  const elapsedMinutes = Math.floor((now - createdAt) / 60000);
  const remainingTime = Math.max(order.eta_minutes - elapsedMinutes, 0);

  res.json({
    status: order.status,
    eta: remainingTime
  });
});

export default router;

// ALL ROUTING KOMMER LÄGGAS TILL HÄR

// ROUTING-struktur ska se ut såhär: router.use("/prefix",prefixRoutes) PREFIX = namnet/nästa moment

//ORDERS 

/*router.get("/orders/status/:orderId", (req, res) => {
const orderId = req.params.orderId;

const order = db
.prepare("SELECT * FROM orders WHERE id = ?")
.get(orderId);

if (!order) {
return res.status(404).json({ message: "Order not found" });
}

const now = Date.now();
const createdAt = new Date(order.created_at).getTime();

const elapsedMinutes = Math.floor((now - createdAt) / 60000);
const remainingTime = Math.max(order.eta_minutes - elapsedMinutes, 0);

res.json({
status: order.status,,
eta: remainingTime
});
});*/