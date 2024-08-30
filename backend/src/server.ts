// backend/src/server.ts

import express, { Request, Response } from "express";
import { openDb } from "./database"; // Import the database connection
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req: Request, res: Response) => {
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

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [
        name,
        email,
        hashedPassword,
        "user", // Default role
      ]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const db = await openDb();
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // In a real application, you'd generate a JWT here
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
