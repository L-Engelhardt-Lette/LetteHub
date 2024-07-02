import { Request, Response } from 'express';
import Project from '../models/project';
import { AuthRequest } from '../types/express';

// function for the creation of a project, only allowed for authorized personell
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    const userId = req.user;

    const project = await Project.create({ name, description, startDate, endDate, status, userId });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// function for getting projects, only allowed for authorized personell
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const projects = await Project.findAll({ where: { userId } });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// function to get projects by their id, only allowed for authorized personell
export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const project = await Project.findOne({ where: { id, userId } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// function for updating projects, only allowed for authorized personell
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    const userId = req.user;

    const project = await Project.findOne({ where: { id, userId } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.name = name;
    project.description = description;
    project.startDate = startDate;
    project.endDate = endDate;
    project.status = status;

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// function to delete the selected project, only allowed for authorized personell
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const project = await Project.findOne({ where: { id, userId } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
