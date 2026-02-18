import { Request, Response } from "express";
import * as killsService from "./kills.service";

// GET /kills - Retrieve all kills
export const getKills = async (_req: Request, res: Response): Promise<void> => {
    try {
        const kills = await killsService.getAllKills();
        res.status(200).json(kills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve kills" });
    }
};

// GET /kills/:id - Retrieve a kill by ID
export const getKillById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const kill = await killsService.getKillById(id);
        if (!kill) {
            res.status(404).json({ error: "Kill not found" });
            return;
        }
        res.status(200).json(kill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve kill" });
    }
};

// POST /kills - Create a new kill
export const createKill = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newKill = await killsService.createKill(req.body);
        res.status(201).json(newKill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create kill" });
    }
};

// PATCH /kills/:id - Update a kill by ID
export const updateKill = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedKill = await killsService.updateKill(id, req.body);
        res.status(200).json(updatedKill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update kill" });
    }
};

// DELETE /kills/:id - Delete a kill by ID
export const deleteKill = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await killsService.deleteKill(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete kill" });
    }
};
