import { Request, Response } from "express";
import * as agentsService from "./agents.service";

// GET /agents - Retrieve all agents
export const getAgents = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const agents = await agentsService.getAllAgents();
    res.status(200).json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch agents" });
  }
};

// GET /agents/:id - Retrieve a single agent by ID
export const getAgentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const agent = await agentsService.getAgentById(id);
    if (!agent) {
      res.status(404).json({ error: "Agent not found" });
      return;
    }
    res.status(200).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch agent" });
  }
};

// POST /agents - Create a new agent
export const createAgent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newAgent = await agentsService.createAgent(req.body);
    res.status(201).json(newAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create agent" });
  }
};

// PATCH /agents/:id - Update an existing agent
export const updateAgent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedAgent = await agentsService.updateAgent(id, req.body);
    res.status(200).json(updatedAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update agent" });
  }
};

// DELETE /agents/:id - Delete an agent
export const deleteAgent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    await agentsService.deleteAgent(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete agent" });
  }
};
