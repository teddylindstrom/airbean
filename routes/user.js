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
router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM users");
  const users = stmt.all();
  res.json(users);
});

// READ (ONE)
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const stmt = db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
  const result = stmt.run(name, email, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ id, name, email });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
});

module.exports = router;