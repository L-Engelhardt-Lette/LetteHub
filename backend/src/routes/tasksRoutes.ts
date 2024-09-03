import { Router } from "express";

const router = Router();

// Define your task-related routes here
router.get("/", (req, res) => res.send("Task route"));

export default router;
