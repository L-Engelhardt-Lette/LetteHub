import express from "express";
import { createProject, getProjects } from "../controllers/projectController";

const router = express.Router();

router.post("/create", createProject);
router.get("/", getProjects);

export default router;
