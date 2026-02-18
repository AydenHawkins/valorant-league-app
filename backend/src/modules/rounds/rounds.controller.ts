import { Request, Response } from "express";
import * as roundsService from "./rounds.service";

// GET /rounds - Retrieve all rounds
export const getRounds = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const rounds = await roundsService.getAllRounds();
    res.status(200).json(rounds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve rounds" });
  }
};

// GET /rounds/:id - Retrieve a round by ID
export const getRoundById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const round = await roundsService.getRoundById(id);
    if (!round) {
      res.status(404).json({ error: "Round not found" });
      return;
    }
    res.status(200).json(round);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve round" });
  }
};

// POST /rounds - Create a new round
export const createRound = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newRound = await roundsService.createRound(req.body);
    res.status(201).json(newRound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create round" });
  }
};

// PATCH /rounds/:id - Update a round by ID
export const updateRound = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedRound = await roundsService.updateRound(id, req.body);
    res.status(200).json(updatedRound);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update round" });
  }
};

// DELETE /rounds/:id - Delete a round by ID
export const deleteRound = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    await roundsService.deleteRound(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete round" });
  }
};
