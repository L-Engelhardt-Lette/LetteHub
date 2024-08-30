import express, { Request, Response } from "express";
import { openDb } from "../database";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Get tasks by projectID
router.get("/tasks", async (req: Request, res: Response) => {
  const { projectID } = req.query;

  if (!projectID) {
    return res.status(400).json({ error: "Missing projectID in query" });
  }

  try {
    const db = await openDb();
    const tasks = await db.all("SELECT * FROM tasks WHERE projectID = ?", [
      projectID,
    ]);

    if (tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found for this project" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create a new task
router.post("/tasks", async (req: Request, res: Response) => {
  const {
    task_name,
    projectID,
    description,
    name,
    persons,
    status,
    progress,
    startDate,
    finishDate,
    columnName,
  } = req.body;

  try {
    const db = await openDb();
    const newTask = {
      id: uuidv4(),
      task_name,
      projectID,
      description,
      name,
      persons: Array.isArray(persons) ? persons.join(",") : "", // Convert array to comma-separated string if provided
      status,
      progress,
      startDate,
      finishDate,
      columnName,
    };

    await db.run(
      `INSERT INTO tasks (
        id, task_name, projectID, description, name, persons, status, progress, startDate, finishDate, columnName
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newTask.id,
        newTask.task_name,
        newTask.projectID,
        newTask.description,
        newTask.name,
        newTask.persons,
        newTask.status,
        newTask.progress,
        newTask.startDate,
        newTask.finishDate,
        newTask.columnName,
      ]
    );

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
router.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    task_name,
    description,
    name,
    persons,
    status,
    progress,
    startDate,
    finishDate,
    columnName,
  } = req.body;

  try {
    const db = await openDb();
    const result = await db.run(
      `UPDATE tasks 
       SET task_name = ?, description = ?, name = ?, persons = ?, status = ?, progress = ?, startDate = ?, finishDate = ?, columnName = ? 
       WHERE id = ?`,
      [
        task_name,
        description,
        name,
        Array.isArray(persons) ? persons.join(",") : "", // Convert array to comma-separated string if provided
        status,
        progress,
        startDate,
        finishDate,
        columnName,
        id,
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await openDb();
    const result = await db.run("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
