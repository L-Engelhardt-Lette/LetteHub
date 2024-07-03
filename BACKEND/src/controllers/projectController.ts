import { Request, Response } from "express";
import db from "../config/dbConfig";

export const createProject = async (req: Request, res: Response) => {
  const { title, startdate, enddate, personworkinon, description } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO projects (title, startdate, enddate, personworkinon, description) VALUES (?, ?, ?, ?, ?)",
      [title, startdate, enddate, JSON.stringify(personworkinon), description]
    );
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Project creation failed" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM projects");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
};
