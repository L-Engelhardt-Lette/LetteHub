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

// Get a single project by ID
router.get("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await openDb();
    const project = await db.get("SELECT * FROM projects WHERE id = ?", [id]);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const tasks = await db.all("SELECT * FROM tasks WHERE project_id = ?", [
      id,
    ]);
    project.tasks = tasks; // Attach tasks to the project

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
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

// Update a project
router.put("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;

  try {
    const db = await openDb();
    const result = await db.run(
      "UPDATE projects SET name = ?, description = ?, startDate = ?, endDate = ? WHERE id = ?",
      [name, description, startDate, endDate, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    const updatedProject = await db.get("SELECT * FROM projects WHERE id = ?", [
      id,
    ]);

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
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
