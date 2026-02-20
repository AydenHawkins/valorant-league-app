import { Request, Response } from "express";
import * as roundPlayerStatsService from "./roundPlayerStats.service";

// GET /roundPlayerStats - Retrieve all round player stats
export const getRoundPlayerStats = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const stats = await roundPlayerStatsService.getAllRoundPlayerStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve round player stats",
    });
  }
};

// GET /roundPlayerStats/:id - Retrieve a specific round player stat by ID
export const getRoundPlayerStatById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const stat = await roundPlayerStatsService.getRoundPlayerStatById(id);
    if (!stat) {
      res.status(404).json({ error: "Round player stat not found" });
      return;
    }
    res.status(200).json(stat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve round player stat" });
  }
};

// POST /roundPlayerStats - Create a new round player stat
export const createRoundPlayerStat = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newStat = await roundPlayerStatsService.createRoundPlayerStat(
      req.body,
    );
    res.status(201).json(newStat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create round player stat" });
  }
};

// PATCH /roundPlayerStats/:id - Update an existing round player stat
export const updateRoundPlayerStat = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedStat = await roundPlayerStatsService.updateRoundPlayerStat(
      id,
      req.body,
    );
    res.status(200).json(updatedStat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update round player stat" });
  }
};

// DELETE /roundPlayerStats/:id - Delete a round player stat
export const deleteRoundPlayerStat = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    await roundPlayerStatsService.deleteRoundPlayerStat(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete round player stat" });
  }
};
