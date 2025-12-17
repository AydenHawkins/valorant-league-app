import { Request, Response } from "express";
import * as mapsService from "./maps.service";

// GET /maps - Retrieve all maps
export const getMaps = async (req: Request, res: Response): Promise<void> => {
    try {
        const maps = await mapsService.getAllMaps();
        res.json(maps);
    } catch (error) {
        console.error("Error retrieving maps:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET /maps/:id - Retrieve a single map by ID
export const getMapById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const map = await mapsService.getMapById(id);
        if (!map) {
            res.status(404).json({ error: "Map not found" });
            return;
        }
        res.json(map);
    } catch (error) {
        console.error("Error retrieving map:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /maps - Create a new map
export const createMap = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newMap = await mapsService.createMap(req.body);
        res.status(201).json(newMap);
    } catch (error) {
        console.error("Error creating map:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// PATCH /maps/:id - Update a map by ID
export const updateMap = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedMap = await mapsService.updateMap(id, req.body);
        res.json(updatedMap);
    } catch (error) {
        console.error("Error updating map:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE /maps/:id - Delete a map by ID
export const deleteMap = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await mapsService.deleteMap(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting map:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
