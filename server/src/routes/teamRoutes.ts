import { Router } from "express";

import { getTeams } from "../controllers/teamController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getTeams);

export default router;
