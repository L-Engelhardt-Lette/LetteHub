import { Request, Response } from 'express';
import Task from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user;  // Assuming req.user contains the userId from the auth middleware

  try {
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user;

  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id, title, description } = req.body;
  const userId = req.user;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.body;
  const userId = req.user;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
