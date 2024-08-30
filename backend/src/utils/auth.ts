// backend/src/utils/auth.ts

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET || "yourSecretKey";

// Define an interface for the user payload that will be stored in req.user
interface UserPayload {
  userId: string;
  email: string;
}

// Extend the Express Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user as UserPayload;
    next();
  });
};

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
};
