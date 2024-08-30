import express, { Request, Response } from "express";
import { openDb } from "../database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { authenticateToken, generateToken } from "../utils/auth"; // Import necessary utilities

const router = express.Router();

// User registration endpoint
router.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const db = await openDb();
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const userId = uuidv4(); // Generate a unique ID for the user
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [userId, name, email, hashedPassword]
    );

    const token = generateToken({ id: userId, email }); // Generate a token for the new user

    res
      .status(201)
      .json({ message: "User registered successfully", token, userId });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login endpoint
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken({ id: user.id, email: user.email }); // Generate a token on successful login
      res.status(200).json({ token, userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// User details endpoint
router.get("/user", authenticateToken, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const db = await openDb();
    const user = await db.get("SELECT name, email FROM users WHERE id = ?", [
      req.user.userId,
    ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
