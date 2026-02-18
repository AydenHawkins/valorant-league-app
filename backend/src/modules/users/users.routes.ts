import { Router } from "express";
import * as usersController from "./users.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const router = Router();

/**
 * POST /api/users/link - Link authenticated user to a player via invite code
 */
router.post("/link", authenticateToken, usersController.linkPlayer);

/**
 * GET /api/users/:id - Get user by ID
 */
router.get("/:id", usersController.getUser);

/**
 * PATCH /api/users/:id - Update user
 */
router.patch("/:id", authenticateToken, usersController.updateUser);

/**
 * DELETE /api/users/:id - Delete user by ID
 */
router.delete("/:id", authenticateToken, usersController.deleteUser);

export default router;
