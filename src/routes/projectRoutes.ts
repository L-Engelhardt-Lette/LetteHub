import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/projects', protect, createProject);
router.get('/projects', protect, getProjects);
router.get('/projects/:id', protect, getProjectById);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

export default router;
