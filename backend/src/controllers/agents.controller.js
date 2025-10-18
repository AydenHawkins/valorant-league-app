const prisma = require("../utilities/prisma");

// GET /agents - Retrieve all agents
const getAgents = async (req, res) => {
    try {
        const agents = await prisma.agent.findMany();
        res.json(agents);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch agents" });
    }
};

// GET /agents/:id - Retrieve a single agent by ID
const getAgentById = async (req, res) => {
    const { id } = req.params;
    try {
        const agent = await prisma.agent.findUnique({
            where: { id: parseInt(id) },
        });
        if (agent) {
            res.json(agent);
        } else {
            res.status(404).json({ error: "Agent not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch agent" });
    }
};

// POST /agents - Create a new agent
const createAgent = async (req, res) => {
    const { name, role } = req.body;
    try {
        const newAgent = await prisma.agent.create({
            data: { name, role },
        });
        res.status(201).json(newAgent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create agent" });
    }
};

// PATCH /agents/:id - Update an existing agent
const updateAgent = async (req, res) => {
    const { id } = req.params;
    const { name, role } = req.body;
    try {
        const updatedAgent = await prisma.agent.update({
            where: { id: parseInt(id) },
            data: { name, role },
        });
        res.json(updatedAgent);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update agent" });
    }
};

// DELETE /agents/:id - Delete an agent
const deleteAgent = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.agent.delete({ where: { id: parseInt(id) } });
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete agent" });
    }
};

module.exports = {
    getAgents,
    getAgentById,
    createAgent,
    updateAgent,
    deleteAgent,
};
