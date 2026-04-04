import express from "express";
import db from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

//  CREATE ORDER
router.post("/", (req, res) => {
  const { userId, items } = req.body;

  //  validering
  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ error: "Missing data or empty order" });
  }

  const orderId = uuidv4();
 

  let total = 0;

  try {
    //  loopar igenom items och hämtear priser från databasen
    for (const item of items) {
      const product = db.prepare(
        "SELECT * FROM products WHERE id = ?"
      ).get(item.productId);

      // produkt finns inte
      if (!product) {
        return res.status(400).json({ error: "Invalid product" });
      }

      // Databas-pris
      total += product.price * item.quantity;

      // spara order_items
      db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `).run(orderId, item.productId, item.quantity, product.price);
    }

    // skapa order


    res.status(201).json({ orderId, total });

  } catch (error) {
    console.error("POST /orders", error);
    res.status(500).json({ error: "Could not create order" });
  }
});


//  GET ORDER HISTORY
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ?
    `).all(userId);

    if (orders.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }

    const result = orders.map(order => {
      const items = db.prepare(`
        SELECT * FROM order_items WHERE order_id = ?
      `).all(order.id);

      return {
        ...order,
        items
      };
    });

    res.json(result);

  } catch (error) {
    console.error("GET /orders/:userId", error);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

export default router;