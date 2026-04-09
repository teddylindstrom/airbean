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

// GET USER
router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const result = stmt.get(id);
    console.log(result);

    if (!result) {
      return res.status(404).json({ BYEBYE: "cant find you :/" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("GET /users/:id", error);
    res.status(500).json({ fel: "can't find you :P", error });
  }
});

router.put("/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({
      error: "At least name or email must be provided",
    });
  }

  try {
    //kollar om användaren finns i databasen
    const existingUser = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(userId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedName = name ?? existingUser.name;
    const updatedEmail = email ?? existingUser.email;

    db.prepare(
      `
      UPDATE users
      SET name = ?, email = ?
      WHERE id = ?
    `,
    ).run(updatedName, updatedEmail, userId);

    const updatedUser = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(userId);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("PUT /api/user/:userId", error);
    res.status(500).json({
      error: "Could not update user",
    });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const result = stmt.run(id);
    if (result.changes === 0) {
      return res.status(404).json({ BYEBYE: "cant find you :/" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("DELETE /users/:id", error);
    res.status(500).json({ fel: "can not delete user, you traped :P", error });
  }
});

export default router;
