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

router.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const userId = await addUser(name, email);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

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
    res.status(500).json({ error: "Failed to get user" });
  }
});

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
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
});

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
    res.status(500).json({ error: "Failed to delete user" });
  }
});

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
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
