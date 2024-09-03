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
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Ensure this matches the route prefix expected
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
