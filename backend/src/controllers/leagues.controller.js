const prisma = require("../utilities/prisma");

// GET /leagues - Retrieve all leagues
const getLeagues = async (req, res) => {
    try {
        const leagues = await prisma.league.findMany();
        res.json(leagues);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch leagues" });
    }
};

// GET /leagues/:id - Retrieve a league by ID
const getLeagueById = async (req, res) => {
    const { id } = req.params;
    try {
        const league = await prisma.league.findUnique({
            where: { id: parseInt(id) },
        });
        if (league) {
            res.json(league);
        } else {
            res.status(404).json({ error: "League not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch league" });
    }
};

// POST /leagues - Create a new league
const createLeague = async (req, res) => {
    const { name } = req.body;
    try {
        const newLeague = await prisma.league.create({
            data: { name },
        });
        res.status(201).json(newLeague);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create league" });
    }
};

// PUT /leagues/:id - Update an existing league
const updateLeague = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedLeague = await prisma.league.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.json(updatedLeague);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update league" });
    }
};

// DELETE /leagues/:id - Delete a league
const deleteLeague = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.league.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete league" });
    }
};

module.exports = {
    getLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
};
