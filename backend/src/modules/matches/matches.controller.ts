import { Request, Response } from "express";
import * as matchesService from "./matches.service";

// GET /matches - Retrieve all matches
export const getMatches = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const matches = await matchesService.getAllMatches();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error retrieving matches:", error);
    res.status(500).json({ error: "Failed to retrieve matches" });
  }
};

// GET /matches/:id - Retrieve a match by ID
export const getMatchById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const match = await matchesService.getMatchById(id);
    if (!match) {
      res.status(404).json({ error: "Match not found" });
      return;
    }
    res.status(200).json(match);
  } catch (error) {
    console.error("Error retrieving match:", error);
    res.status(500).json({ error: "Failed to retrieve match" });
  }
};

// POST /matches - Create a new match
export const createMatch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newMatch = await matchesService.createMatch(req.body);
    res.status(201).json(newMatch);
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({ error: "Failed to create match" });
  }
};

// PATCH /matches/:id - Update a match by ID
export const updateMatch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedMatch = await matchesService.updateMatch(id, req.body);
    res.status(200).json(updatedMatch);
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ error: "Failed to update match" });
  }
};

// DELETE /matches/:id - Delete a match by ID
export const deleteMatch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    await matchesService.deleteMatch(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({ error: "Failed to delete match" });
  }
};
