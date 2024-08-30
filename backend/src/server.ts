// backend/src/server.ts

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects"; // Import the project routes
import { openDb } from "./database";

const app = express();
const port = 3001; // Ensure this port matches the one your backend is running on

// Configure CORS to allow credentials and restrict origins
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend's origin
    credentials: true, // Allow cookies and HTTP authentication to be sent
  })
);

app.use(express.json());

// Connect to the database and ensure tables are set up
app.use(async (req, res, next) => {
  const db = await openDb();

  // Create users table
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Create projects table
  await db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      startDate TEXT,
      endDate TEXT
    )
  `);

  // Create tasks table
  await db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_name TEXT NOT NULL,
      projectID TEXT NOT NULL,
      description TEXT,
      name TEXT,
      persons TEXT, -- Consider storing as a JSON string or CSV
      status INTEGER,
      progress INTEGER,
      startDate TEXT,
      finishDate TEXT,
      column TEXT,
      FOREIGN KEY(projectID) REFERENCES projects(id) ON DELETE CASCADE
    )
  `);

  next();
});

// Use the authentication routes
app.use("/api", authRoutes);

// Use the project routes
app.use("/api", projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
