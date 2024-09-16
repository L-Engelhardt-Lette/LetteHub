import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sequelize from "./database"; // Import your Sequelize instance

dotenv.config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const app = express();

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // Ensure JSON parsing is enabled

// Routes
app.post(`/login`, async (req, res) => {
  const { username, password } = req.body;

  // Log the incoming request body to check if username and password are present
  console.log("Request body:", req.body);

  try {
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find the user by username only
    const user = await User.findOne({
      where: { username }, // Querying only by `username`
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with the token and user details
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error: any) {
    console.error("Error during login:", error.message || error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message || "Unknown error",
    });
  }
});

// Listen on port 8899
app.listen(8899, () => {
  console.log("Server is running on http://localhost:8899");
});
