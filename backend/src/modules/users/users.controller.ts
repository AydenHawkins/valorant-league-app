import { Request, Response } from "express";
import * as usersService from "./users.service";

/**
 * Get user by ID.
 * GET /api/users/:id
 */

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const isOwnerOrAdmin =
      req.user?.userId === userId || req.user?.role === "ADMIN";
    const user = await usersService.getUserById(userId, isOwnerOrAdmin);

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * Update user.
 * PATCH /api/users/:id
 * Authorization: Users can only update their own data
 */

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const { username, email } = req.body;

    if (req.user!.userId !== userId && req.user!.role !== "ADMIN") {
      res.status(403).json({
        error: "Forbidden: You can only update your own profile",
      });
      return;
    }

    const updatedUser = await usersService.updateUser(userId, {
      username,
      email,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * Delete user by ID.
 * DELETE /api/users/:id
 * Authorization: Users can only delete their own account, or admin
 */

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);

    if (req.user!.userId !== userId && req.user!.role !== "ADMIN") {
      res.status(403).json({
        error: "Forbidden: You can only delete your own account",
      });
      return;
    }

    await usersService.deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * Link authenticated user to an existing player via invite code.
 * POST /api/users/link
 */

export const linkPlayer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { inviteCode } = req.body;

    if (!inviteCode) {
      res.status(400).json({ error: "Invite code is required" });
      return;
    }

    const updatedUser = await usersService.linkWithInviteCode(
      req.user!.userId,
      inviteCode,
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Invalid invite code") {
        res.status(404).json({ error: error.message });
        return;
      }
      if (
        error.message === "User is already linked to a player" ||
        error.message === "Player is already linked to an account"
      ) {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
};
