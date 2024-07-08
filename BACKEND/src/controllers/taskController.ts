import { Request, Response } from 'express';
import { createTask, getTasksByProjectId } from  '../controllers/taskController'

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const { projectId, taskName, taskData } = req.body;
        const result = await createTask({ projectId, taskName, taskData });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTasksController = async (req: Request, res: Response) => {
    try {
        const { projectId } = req.params;
        const tasks = await getTasksByProjectId(Number(projectId));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
export { createTask, getTasksByProjectId };

