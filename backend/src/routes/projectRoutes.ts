import { Router } from "express";

const router = Router();

// Define your project-related routes here
router.get("/", (req, res) => res.send("Project route"));

export default router;
