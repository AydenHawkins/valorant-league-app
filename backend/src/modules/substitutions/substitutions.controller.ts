import { Request, Response } from "express";
import * as substitutionsService from "./substitutions.service";

// GET /substitutions - Retrieve all substitutions
export const getSubstitutions = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const substitutions = await substitutionsService.getAllSubstitutions();
        res.json(substitutions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch substitutions" });
    }
};

// GET /substitutions/:id - Retrieve a substitution by ID
export const getSubstitutionById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const substitution = await substitutionsService.getSubstitutionById(id);
        if (substitution) {
            res.json(substitution);
        } else {
            res.status(404).json({ error: "Substitution not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch substitution" });
    }
};

// POST /substitutions - Create a new substitution
export const createSubstitution = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const substitution = await substitutionsService.createSubstitution(
            req.body
        );
        res.status(201).json(substitution);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create substitution" });
    }
};

// PUT /substitutions/:id - Update a substitution
export const updateSubstitution = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const substitution = await substitutionsService.updateSubstitution(
            id,
            req.body
        );
        res.json(substitution);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update substitution" });
    }
};

// DELETE /substitutions/:id - Delete a substitution
export const deleteSubstitution = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await substitutionsService.deleteSubstitution(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete substitution" });
    }
};
