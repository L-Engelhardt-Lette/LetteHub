import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/tasksRoutes";
import authRoutes from "./routes/authRoutes"; // Ensure this import is correct
import { errorHandler } from "./utils/errorHandler";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Ensure cookies/credentials are allowed
  })
);
app.use(express.json()); // Parse incoming JSON

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/projects", projectRoutes); // Project routes
app.use("/api/tasks", taskRoutes); // Task routes

// Error handling middleware
app.use(errorHandler); // Custom error handler

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
