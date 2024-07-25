import express, { Request, Response } from "express";
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth";

const router = express.Router();

router.get(
  "/protected",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "This is a protected route", userId: req.userId });
  }
);

export default router;
