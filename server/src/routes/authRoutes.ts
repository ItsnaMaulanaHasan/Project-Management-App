import { Router } from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
