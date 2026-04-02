import Database from "better-sqlite3";

const db = new Database ("./data/airbean.db");

// Skapa tabell
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    createdAt TEXT
  )
`);
//skapa menu
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT NOT NULL
  )
`);

// Orders
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    total_price INTEGER,
    status TEXT,
    createdAt TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// Order items (vad som finns i ordern)
db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT,
    product_id TEXT,
    quantity INTEGER,
    price INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  )
`);

export default db;
