import { Router } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received login request with username:", username);

  try {
    const user = await User.findOne({
      where: { email: username },
    });

    if (!user) {
      console.log("User not found with username:", username);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // Note: TypeScript now recognizes user.password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    console.log("Login successful, token generated");

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Login failed", error });
  }
});

export default router;
