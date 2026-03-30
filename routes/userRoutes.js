import express from "express";
import db from "../data/db.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// CREATE
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const id = uuidv4();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO users (id, name, email, createdAt) 
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(id, name, email, createdAt);

  res.status(201).json({ id, name, email, createdAt });
});

export default router;

// READ (ALL)

// READ (ONE)

// UPDATE

// DELETE
