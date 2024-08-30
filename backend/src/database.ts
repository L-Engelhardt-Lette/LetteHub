// backend/src/database.ts

import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Function to open a connection to the SQLite database
export const openDb = async () => {
  return open({
    filename: "./lettedb.db",
    driver: sqlite3.Database,
  });
};
