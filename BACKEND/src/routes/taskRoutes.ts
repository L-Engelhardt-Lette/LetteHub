import { Router } from 'express';
import { createTask, getTasksByProject } from '../controllers/taskController';

const router = Router();

router.post('/create', createTask);
router.get('/project/:projectId', getTasksByProject);

export default router;
