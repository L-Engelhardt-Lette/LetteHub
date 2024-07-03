import express from "express";
import { createTask, getTasks } from "../controllers/taskController";

const router = express.Router();

router.post("/create", createTask);
router.get("/:project_id", getTasks);

export default router;
