import { Router } from 'express';
import { protect } from '../middlewares/auth';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';

const router = Router();

router.post('/tasks', protect, createTask);
router.get('/tasks', protect, getTasks);
router.put('/tasks', protect, updateTask);
router.delete('/tasks', protect, deleteTask);

export default router;
