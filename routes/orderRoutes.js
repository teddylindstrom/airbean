import express from "express";
import db from "../data/db.js";
import { v4 as uuidv4 } from "uuid";
import { validateOrder } from "../middleware/validateOrder.js";
import { validateId } from "../middleware/validateId.js";

const router = express.Router();

// CREATE ORDER låter middleware validera ordern innan den skapas
router.post("/", validateOrder, (req, res) => {
  //inloggad användare: userId finns i req.body om användaren är inloggad, annars null för gästorder 
  const { userId = null, items } = req.body || {};

  const orderId = uuidv4();
  //skapar ett enkelt ordernummer.
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const status = "pending";
  const createdAt = new Date().toISOString();

  let total = 0;
  let totalQuantity = 0;
  // Beräkna totalpris och total mängd för att kunna beräkna ETA
  try {
    for (const item of items) {
      const product = db
        .prepare("SELECT * FROM products WHERE id = ?")
        .get(item.productId);

      total += product.price * item.quantity;
      totalQuantity += item.quantity;
    }

    const etaMinutes = 10 + totalQuantity * 2;

    // skapa order i orders-tabellen
    db.prepare(`
      INSERT INTO orders (id, user_id, total_price, status, eta_minutes, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(orderId, userId, total, status, etaMinutes, createdAt);

    // skapa order_items
    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    for (const item of items) {
      insertOrderItem.run(orderId, item.productId, item.quantity, item.price);
    }

    // returnera kvitto
    res.status(201).json({
      orderId,
      orderNumber,
      totalPrice: total,
      etaMinutes,
      status,
      createdAt,
      items,
    });
  } catch (error) {
    console.error("POST /orders", error);
    res.status(500).json({ error: "Could not create order" });
  }
});

// GET ORDER HISTORY
router.get("/:userId", validateId, (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ?
    `).all(userId);

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }
    // För varje order, hämta tillhörande order_items
    const result = orders.map((order) => {
      const items = db.prepare(`
        SELECT * FROM order_items WHERE order_id = ?
      `).all(order.id);

      return {
        ...order,
        items,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("GET /orders/:userId", error);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

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