// backend/src/routes/projects.ts

import express, { Request, Response } from "express";
import { openDb } from "../database";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Get all projects
router.get("/projects", async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const projects = await db.all("SELECT * FROM projects");
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Create a new project
router.post("/projects", async (req: Request, res: Response) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const db = await openDb();
    const newProject = {
      id: uuidv4(),
      name,
      description,
      startDate,
      endDate,
    };

    await db.run(
      "INSERT INTO projects (id, name, description, startDate, endDate) VALUES (?, ?, ?, ?, ?)",
      [
        newProject.id,
        newProject.name,
        newProject.description,
        newProject.startDate,
        newProject.endDate,
      ]
    );

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Delete a project
router.delete("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM projects WHERE id = ?", [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
