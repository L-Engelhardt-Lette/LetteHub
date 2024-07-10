import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, projectId } = req.body;
        const newTask = await Task.create({ title, description, projectId });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Task creation failed' });
    }
};

export const getTasksByProject = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.findAll({ where: { projectId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
