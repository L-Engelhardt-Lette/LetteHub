// backend/src/server.ts

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import projectRoutes from "./routes/projects";
import taskRoutes from "./routes/tasks";
import { openDb } from "./database";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

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
      endDate TEXT,
      tasks TEXT -- Stores tasks as a JSON string
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
      persons TEXT, -- Stored as a JSON string or CSV
      status INTEGER,
      progress INTEGER,
      startDate TEXT,
      finishDate TEXT,
      columnName TEXT, -- Renamed to avoid conflict with SQL keywords
      FOREIGN KEY(projectID) REFERENCES projects(id) ON DELETE CASCADE
    )
  `);

  next();
});

// Use the authentication routes
app.use("/api", authRoutes);

// Use the project routes
app.use("/api", projectRoutes);

// Use the task routes
app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
