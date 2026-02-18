import { Request, Response } from "express";
import * as defusesService from "./defuses.service";

// GET /defuses - Retrieve all defuses
export const getDefuses = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const defuses = await defusesService.getAllDefuses();
        res.status(200).json(defuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve defuses" });
    }
};

// GET /defuses/:id - Retrieve a defuse by ID
export const getDefuseById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const defuse = await defusesService.getDefuseById(id);
        if (!defuse) {
            res.status(404).json({ error: "Defuse not found" });
            return;
        }
        res.status(200).json(defuse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve defuse" });
    }
};

// POST /defuses - Create a new defuse
export const createDefuse = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newDefuse = await defusesService.createDefuse(req.body);
        res.status(201).json(newDefuse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create defuse" });
    }
};

// PATCH /defuses/:id - Update an existing defuse
export const updateDefuse = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedDefuse = await defusesService.updateDefuse(id, req.body);
        res.status(200).json(updatedDefuse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update defuse" });
    }
};

// DELETE /defuses/:id - Delete a defuse
export const deleteDefuse = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await defusesService.deleteDefuse(id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete defuse" });
    }
};
