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


export default db;
