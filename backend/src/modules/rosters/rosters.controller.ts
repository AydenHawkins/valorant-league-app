import { Request, Response } from "express";
import * as rostersService from "./rosters.service";

// GET /rosters - Retrieve all rosters
export const getRosters = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const rosters = await rostersService.getAllRosters();
        res.status(200).json(rosters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch rosters" });
    }
};

// GET /rosters/:id - Retrieve a roster by ID
export const getRosterById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const roster = await rostersService.getRosterById(id);
        if (!roster) {
            res.status(404).json({ error: "Roster not found" });
            return;
        }
        res.status(200).json(roster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch roster" });
    }
};

// POST /rosters - Create a new roster
export const createRoster = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const roster = await rostersService.createRoster(req.body);
        res.status(201).json(roster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create roster" });
    }
};

// PATCH /rosters/:id - Update a roster by ID
export const updateRoster = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const roster = await rostersService.updateRoster(id, req.body);
        res.status(200).json(roster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update roster" });
    }
};

// DELETE /rosters/:id - Delete a roster by ID
export const deleteRoster = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await rostersService.deleteRoster(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete roster" });
    }
};
