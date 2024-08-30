// backend/src/server.ts

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects"; // Import the project routes
import { openDb } from "./database";

const app = express();
const port = 3001;

// Configure CORS to allow credentials and restrict origins
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

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

  await db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      startDate TEXT,
      endDate TEXT
    )
  `);
  next();
});

// Use the authentication routes
app.use("/api", authRoutes);

// Use the project routes
app.use("/api", projectRoutes); // Ensure the project routes are correctly used

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
