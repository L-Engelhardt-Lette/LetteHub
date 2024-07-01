import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: string; // Assuming 'id' is a string
}