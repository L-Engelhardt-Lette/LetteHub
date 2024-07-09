import { Router } from 'express';
import { createProject, getAllProjects } from '../controllers/projectController';

const router = Router();

router.post('/create', createProject);
router.get('/all', getAllProjects);

export default router;
