const express = require("express");
const router = express.Router();
const db = require("../db");

const { v4: uuidv4 } = require("uuid");

// CREATE
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const id = uuidv4();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare("INSERT INTO users (id, name, email, createdAt) VALUES (?, ?, ?, ?)");
  stmt.run(id, name, email, createdAt);

  res.status(201).json({ id, name, email, createdAt });
});

// READ (ALL)

// READ (ONE)

// UPDATE

// DELETE


module.exports = router;