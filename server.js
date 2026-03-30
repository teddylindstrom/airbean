import "dotenv/config";
import express from "express";
import db from "./data/db.js";
import menu from "./data/menu.json" with { type: "json" };
import userRoutes from "./routes/userRoutes.js";
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

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`API:et lyssnar på http://localhost:${PORT}`);
});
