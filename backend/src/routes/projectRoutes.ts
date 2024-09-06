import { Router } from "express";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/authMiddleware"; // Ensure this is working

const router = Router();

// Fetch all projects
router.get("/", authMiddleware, getProjects);

// Create a new project
router.post("/", authMiddleware, createProject);

// Delete a project
router.delete("/:id", authMiddleware, deleteProject);

export default router;
