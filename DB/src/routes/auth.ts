import express, { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/jwt";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = (await User.findOne({ username, password })) as IUser | null;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

export default router;
