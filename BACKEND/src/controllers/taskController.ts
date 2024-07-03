import { Request, Response } from "express";
import db from "../config/dbConfig";

export const createTask = async (req: Request, res: Response) => {
  const {
    task_name,
    project_id,
    description,
    persons,
    status,
    progress,
    startDate,
    finishDate,
  } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO tasks (task_name, project_id, description, persons, status, progress, startDate, finishDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        task_name,
        project_id,
        description,
        JSON.stringify(persons),
        status,
        progress,
        startDate,
        finishDate,
      ]
    );
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Task creation failed" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { project_id } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM tasks WHERE project_id = ?",
      [project_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};
