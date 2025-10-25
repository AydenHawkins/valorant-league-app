const prisma = require("../utilities/prisma");

// GET /teams - Retrieve all teams
const getTeams = async (req, res) => {
    try {
        const teams = await prisma.team.findMany();
        res.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /teams/:id - Retrieve a team by ID
const getTeamById = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await prisma.team.findUnique({
            where: { id: parseInt(id) },
        });
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
const createTeam = async (req, res) => {
    const { name } = req.body;
    try {
        const newTeam = await prisma.team.create({
            data: { name },
        });
        res.status(201).json(newTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /teams/:id - Update an existing team
const updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedTeam = await prisma.team.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.json(updatedTeam);
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /teams/:id - Delete a team
const deleteTeam = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.team.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
};
