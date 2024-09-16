import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const initDatabase = async () => {
  const dbPath = path.resolve(__dirname, "lettedb.sqlite");

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT "user",
    );
  `);

  // Return the database connection
  return db;
};

export default initDatabase;
