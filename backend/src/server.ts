// backend/src/server.ts

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import { openDb } from "./database";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connect to the database and ensure tables are set up
app.use(async (req, res, next) => {
  const db = await openDb();
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
  next();
});

// Use the authentication routes
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
