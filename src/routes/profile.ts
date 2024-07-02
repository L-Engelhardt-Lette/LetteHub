// src/routes/profile.ts

import express, { Request, Response } from 'express';
import { protect } from '../middlewares/auth';
import { AuthRequest } from '../types/express';

const router = express.Router();

router.get('/profile', protect, (req: AuthRequest, res: Response) => {
  const userId = req.user; // Now TypeScript should recognize req.user as a string
  res.send(`User profile for user ID ${userId}`);
});

export default router;
