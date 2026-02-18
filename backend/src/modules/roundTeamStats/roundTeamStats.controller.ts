import { Request, Response } from "express";
import * as roundTeamStatsService from "./roundTeamStats.service";

// GET /roundTeamStats - Retrieve all round team stats
export const getRoundTeamStats = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const roundTeamStats = await roundTeamStatsService.getAllRoundTeamStats();
        res.status(200).json(roundTeamStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch round team stats" });
    }
};

// GET /roundTeamStats/:id - Retrieve a specific round team stat by ID
export const getRoundTeamStatById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const roundTeamStat = await roundTeamStatsService.getRoundTeamStatById(id);
        if (!roundTeamStat) {
            res.status(404).json({ error: "Round team stat not found" });
            return;
        }
        res.status(200).json(roundTeamStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch round team stat" });
    }
};

// POST /roundTeamStats - Create a new round team stat
export const createRoundTeamStat = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newRoundTeamStat = await roundTeamStatsService.createRoundTeamStat(
            req.body
        );
        res.status(201).json(newRoundTeamStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create round team stat" });
    }
};

// PATCH /roundTeamStats/:id - Update an existing round team stat
export const updateRoundTeamStat = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedRoundTeamStat =
            await roundTeamStatsService.updateRoundTeamStat(id, req.body);
        res.status(200).json(updatedRoundTeamStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update round team stat" });
    }
};

// DELETE /roundTeamStats/:id - Delete a round team stat
export const deleteRoundTeamStat = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await roundTeamStatsService.deleteRoundTeamStat(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete round team stat" });
    }
};
