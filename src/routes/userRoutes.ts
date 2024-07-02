import { Router } from 'express';
import { register, login } from '../controllers/userController';

const router = Router();

router.post('/signup', register);
router.post('/login', login);

export default router;
