import { Router, Request, Response } from "express";
import {
  addUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  getUserByEmail,
  deleteUserByEmail,
} from "../db/userReposetory";

const router = Router();

// Add a new user
router.post("/users", async (req: Request, res: Response) => {
  const { username, email, password } = req.body; // Include 'password' here

  try {
    // Validate the input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    // Pass username, email, and password to addUser
    const userId = await addUser(username, email, password);
    res.status(201).json({ id: userId });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Get user by ID
router.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserById(parseInt(id, 10));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Get user by email
router.get("/users/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Get all users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

// Delete user by ID
router.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const changes = await deleteUserById(parseInt(id, 10));
    if (changes) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// Delete user by email
router.delete("/users/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const changes = await deleteUserByEmail(email);
    if (changes) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user by email:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
