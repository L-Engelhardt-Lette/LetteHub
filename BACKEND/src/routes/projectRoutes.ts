import { Router } from 'express';
import { createProjectController, getProjectsController } from '../controllers/projectController';

const router = Router();

router.post('/projects', createProjectController);
router.get('/projects/:userId', getProjectsController);

export default router;
