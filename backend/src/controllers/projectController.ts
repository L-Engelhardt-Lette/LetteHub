import { Request, Response } from "express";
import { getDatabase } from "../utils/database";
import { v4 as uuidv4 } from "uuid"; // For generating project IDs

// Fetch all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const db = await getDatabase();
    const projects = await db.all("SELECT * FROM projects"); // Fetch all projects
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to load projects" });
  }
};

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate } = req.body;
  const projectId = uuidv4(); // Generate a new unique project ID

  try {
    const db = await getDatabase();

    // Insert the new project into the database
    await db.run(
      `INSERT INTO projects (project_id, name, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)`,
      projectId,
      name,
      description,
      startDate,
      endDate
    );

    const newProject = {
      project_id: projectId,
      name,
      description,
      start_date: startDate,
      end_date: endDate,
    };

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const db = await getDatabase();

    // Delete the project from the database
    const result = await db.run(
      `DELETE FROM projects WHERE project_id = ?`,
      id
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
