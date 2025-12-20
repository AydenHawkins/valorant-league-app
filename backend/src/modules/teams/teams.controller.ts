import { Request, Response } from "express";
import * as teamsService from "./teams.service";

// GET /teams - Retrieve all teams
export const getTeams = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const teams = await teamsService.getAllTeams();
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /teams/:id - Retrieve a team by ID
export const getTeamById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const team = await teamsService.getTeamById(id);
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ error: "Team not found" });
        }
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /teams - Create a new team
export const createTeam = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newTeam = await teamsService.createTeam(req.body);
        res.status(201).json(newTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /teams/:id - Update an existing team
export const updateTeam = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedTeam = await teamsService.updateTeam(id, req.body);
        res.json(updatedTeam);
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /teams/:id - Delete a team
export const deleteTeam = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        await teamsService.deleteTeam(id);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
