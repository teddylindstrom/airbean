import "dotenv/config";
import express from "express";
import db from "./data/db.js";
import menu from "./data/menu.json" with { type: "json" };
import apiRoutes from "./routes/api.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const existingMenu = db.prepare("SELECT COUNT(*) as count FROM products").get();
if (existingMenu.count === 0) {
  const insert = db.prepare(`INSERT INTO  products(id, title, price) 
    VALUES(?, ?, ?)`);

  for (const item of menu.menu) {
    insert.run(item.id, item.title, item.price);
  }
}

const existingOrders = db.prepare("SELECT COUNT(*) as count FROM orders").get();

if (existingOrders.count === 0) {
  const insertOrder = db.prepare(`
    INSERT INTO orders (id, status, created_at, eta_minutes)
    VALUES (?, ?, ?, ?)
  `);

  insertOrder.run(
    "123",
    "pending",
    new Date().toISOString(),
    15
  );
}

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
  res.json({ text: "coffe shop in the air" });
});
app.listen(PORT, () => {
  console.log(`API:et lyssnar på http://localhost:${PORT}`);
});
