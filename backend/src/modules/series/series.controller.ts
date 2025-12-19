import { Request, Response } from "express";
import * as seriesService from "./series.service";

// GET /series - Retrieve all series
export const getSeries = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const series = await seriesService.getAllSeries();
        res.json(series);
    } catch (error) {
        console.error("Error fetching series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET /series/:id - Retrieve a series by ID
export const getSeriesById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const series = await seriesService.getSeriesById(id);
        if (series) {
            res.json(series);
        } else {
            res.status(404).json({ error: "Series not found" });
        }
    } catch (error) {
        console.error("Error fetching series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /series - Create a new series
export const createSeries = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newSeries = await seriesService.createSeries(req.body);
        res.status(201).json(newSeries);
    } catch (error) {
        console.error("Error creating series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT /series/:id - Update an existing series
export const updateSeries = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedSeries = await seriesService.updateSeries(id, req.body);
        res.json(updatedSeries);
    } catch (error) {
        console.error("Error updating series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE /series/:id - Delete a series
export const deleteSeries = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await seriesService.deleteSeries(id);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
