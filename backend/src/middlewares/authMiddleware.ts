import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

// Update UserPayload interface to include userId
interface UserPayload {
  userId: string; // Include userId as required
  id: string;
  email: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = verifyToken(token);

    if (typeof decodedToken === "string") {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.user = decodedToken as UserPayload; // Assign the correct type with userId
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
