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



// READ (ALL)

// READ (ONE)

// UPDATE

// DELETE
router.delete ("/:id",(req, res) => {
  const id = req.params.id;
  try {
    const stmt  = db.prepare("DELETE FROM users WHERE id = ?")
    const result = stmt.run(id);
    if (result.changes===0){
      return res .status(404).json({BYEBYE:"cant find you :/"})
    }
    res.status(204).send()
  } catch (error) {
    console.error("DELETE /users/:id", error);
    res.status(500).json({ fel: "can not delete user, you traped :P", error });
  }
})

export default router;
