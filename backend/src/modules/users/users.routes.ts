import { Router } from "express";
import * as usersController from "./users.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const router = Router();

/**
 * GET /api/users/:id - Get user profile by ID
 */
router.get("/:id", authenticateToken, usersController.getUserProfile);

/**
 * POST /api/users - Create a new user
 */
router.post("/", authenticateToken, usersController.createUser);

/**
 * PATCH /api/users/:id - Update user profile
 */
router.patch("/:id", authenticateToken, usersController.updateUserProfile);

/** DELETE /api/users/:id - Delete user by ID
 */
router.delete("/:id", authenticateToken, usersController.deleteUser);

export default router;
