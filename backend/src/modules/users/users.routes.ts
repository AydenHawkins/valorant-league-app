import { Router } from "express";
import * as usersController from "./users.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/users/:id - Get user profile by ID
 */
router.get("/:id", authenticateToken, usersController.getUserProfile);

/**
 * PATCH /api/users/:id - Update user profile
 */
router.patch("/:id", authenticateToken, usersController.updateUserProfile);

export default router;
