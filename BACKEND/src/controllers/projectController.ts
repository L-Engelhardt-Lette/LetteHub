import { Request, Response } from 'express';
import Project from '../models/project';

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const newProject = await Project.create({ name, description });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Project creation failed' });
    }
};

export const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};
