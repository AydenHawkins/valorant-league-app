import { Request, Response } from "express";
import * as usersService from "./users.service";

/**
 * Get user profile by ID.
 * GET /api/users/:id
 */

export const getUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = parseInt(req.params.id);
        const user = await usersService.getUserById(userId);

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
 * Update user profile.
 * PATCH /api/users/:id
 * Authorization: Users can only update their own profile
 */

export const updateUserProfile = async (
    req: Request,
    res: Response
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

        const updateUser = await usersService.updateUserProfile(userId, {
            username,
            email,
        });

        res.status(200).json(updateUser);
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
