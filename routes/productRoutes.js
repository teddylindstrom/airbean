import express, { Router } from "express";
import db from "../data/db.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    const menu = db.prepare("SELECT * FROM products").all();
    res.json(menu);
  } catch (error) {
    console.error("GET /menu:", error);
    res.status(500).json({ fel: "kunde inte hämta meny", error });
  }
});

export default router;
