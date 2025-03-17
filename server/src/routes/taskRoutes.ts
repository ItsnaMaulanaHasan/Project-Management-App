import { Router } from "express";
import { createTask, deleteTask, getTasks, getUserTasks, updateTask, updateTaskStatus } from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getTasks);
router.post("/", authenticateToken, createTask);
router.patch("/:taskId", authenticateToken, updateTask);
router.delete("/:taskId", authenticateToken, deleteTask);
router.patch("/:taskId/status", authenticateToken, updateTaskStatus);
router.get("/user/:userId", authenticateToken, getUserTasks);

export default router;
