import { Router } from 'express';
import { createTaskController, getTasksController } from '../controllers/taskController';

const router = Router();

router.post('/tasks', createTaskController);
router.get('/tasks/:projectId', getTasksController);

export default router;
