import express from "express";
import { register, login, getUserDetails } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware"; // Middleware to check authentication

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleware, getUserDetails); // Add this route

export default router;
