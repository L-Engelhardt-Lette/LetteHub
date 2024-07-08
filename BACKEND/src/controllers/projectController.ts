import { Request, Response } from 'express';
import { createProject, getProjectsByUserId } from '../api/projectService';

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { userId, projectName, projectData } = req.body;
        const result = await createProject({ userId, projectName, projectData });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProjectsController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const projects = await getProjectsByUserId(Number(userId));
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
