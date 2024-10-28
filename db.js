// db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";

let dbInstance = null;

export const openDb = async () => {
  if (!dbInstance) {
    dbInstance = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });

    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    await dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT,
        email TEXT UNIQUE,
        phone TEXT,
        address TEXT,
        timezone TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    console.log("Database initialized");
  }
  return dbInstance;
};
