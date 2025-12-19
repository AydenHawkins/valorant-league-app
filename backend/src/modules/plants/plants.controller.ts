import { Request, Response } from "express";
import * as plantsService from "./plants.service";

// GET /plants - Retrieve all plants
export const getPlants = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const plants = await plantsService.getAllPlants();
        res.status(200).json(plants);
    } catch (error) {
        console.error("Error fetching plants:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /plants/:id - Retrieve a plant by ID
export const getPlantById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const plant = await plantsService.getPlantById(id);
        if (!plant) {
            res.status(404).json({ error: "Plant not found" });
            return;
        }
        res.status(200).json(plant);
    } catch (error) {
        console.error("Error fetching plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /plants - Create a new plant
export const createPlant = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newPlant = await plantsService.createPlant(req.body);
        res.status(201).json(newPlant);
    } catch (error) {
        console.error("Error creating plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /plants/:id - Update a plant by ID
export const updatePlant = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedPlant = await plantsService.updatePlant(id, req.body);
        res.status(200).json(updatedPlant);
    } catch (error) {
        console.error("Error updating plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /plants/:id - Delete a plant by ID
export const deletePlant = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await plantsService.deletePlant(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
