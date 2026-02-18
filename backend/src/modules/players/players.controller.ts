import { Request, Response } from "express";
import * as playersService from "./players.service";

// GET /players - Retrieve all players
export const getPlayers = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    try {
        const players = await playersService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /players/:id - Retrieve a player by ID
export const getPlayerById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    try {
        const player = await playersService.getPlayerById(id);
        if (!player) {
            res.status(404).json({ error: "Player not found" });
            return;
        }
        res.status(200).json(player);
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /players - Create a new player
export const createPlayer = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const newPlayer = await playersService.createPlayer(req.body);
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /players/:id/invite-code - Generate an invite code for a player
export const generateInviteCode = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    try {
        const inviteCode = await playersService.generateInviteCode(id);
        if (!inviteCode) {
            res.status(404).json({ error: "Player not found" });
            return;
        }
        res.status(200).json({ inviteCode });
    } catch (error) {
        if (error instanceof Error && error.message === "PLAYER_ALREADY_LINKED") {
            res.status(409).json({ error: "Player is already linked to a user account" });
            return;
        }
        console.error("Error generating invite code:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PATCH /players/:id - Update an existing player
export const updatePlayer = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedPlayer = await playersService.updatePlayer(id, req.body);
        res.status(200).json(updatedPlayer);
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /players/:id - Delete a player
export const deletePlayer = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id } = req.params;
    try {
        await playersService.deletePlayer(id);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
