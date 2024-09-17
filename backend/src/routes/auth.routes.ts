import { Router } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Ensure the password field exists
    if (!user.password) {
      console.error("Login error: Password field is missing for user.");
      return res
        .status(500)
        .json({ success: false, message: "Server error: Missing password." });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); // Use `user.password`
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    // Access the JWT secret key from environment variables
    const JWT_SECRET = process.env.JWT_SECRET_KEY || "lettekey";

    if (!JWT_SECRET) {
      console.error("JWT_SECRET_KEY is not defined in environment variables.");
      return res.status(500).json({
        success: false,
        message: "Server error: JWT secret key is not configured.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      // Use `user.id`
      expiresIn: "1h",
    });

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({ success: true, token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });
    }

    // Check if the username or email is already in use
    const existingUser = await User.findOne({ where: { username } });
    const existingEmail = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already in use." });
    }

    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
