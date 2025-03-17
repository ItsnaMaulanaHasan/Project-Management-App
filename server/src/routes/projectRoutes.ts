import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/projectController";

const router = Router();

router.get("/", authenticateToken, getProjects);
router.post("/", authenticateToken, createProject);
router.patch("/:id", authenticateToken, updateProject);
router.delete("/:id", authenticateToken, deleteProject);

export default router;
