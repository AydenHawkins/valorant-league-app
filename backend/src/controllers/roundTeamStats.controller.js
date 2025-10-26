const prisma = require("../utilities/prisma");

// GET /roundTeamStats - Retrieve all round team stats
const getRoundTeamStats = async (req, res) => {
    try {
        const roundTeamStats = await prisma.roundTeamStat.findMany();
        res.json(roundTeamStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch round team stats" });
    }
};

// GET /roundTeamStats/:id - Retrieve a specific round team stat by ID
const getRoundTeamStatById = async (req, res) => {
    const { id } = req.params;
    try {
        const roundTeamStat = await prisma.roundTeamStat.findUnique({
            where: { id: parseInt(id) },
        });
        if (!roundTeamStat) {
            return res.status(404).json({ error: "Round team stat not found" });
        }
        res.json(roundTeamStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch round team stat" });
    }
};

// POST /roundTeamStats - Create a new round team stat
const createRoundTeamStat = async (req, res) => {
    const { roundId, teamId, teamSide, won } = req.body;
    try {
        const newRoundTeamStat = await prisma.roundTeamStat.create({
            data: {
                roundId,
                teamId,
                teamSide,
                won,
            },
        });
        res.status(201).json(newRoundTeamStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create round team stat" });
    }
};

// PUT /roundTeamStats/:id - Update an existing round team stat
const updateRoundTeamStat = async (req, res) => {
    const { id } = req.params;
    const { roundId, teamId, teamSide, won } = req.body;
    try {
        const updatedRoundTeamStat = await prisma.roundTeamStat.update({
            where: { id: parseInt(id) },
            data: {
                roundId,
                teamId,
                teamSide,
                won,
            },
        });
        res.json(updatedRoundTeamStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update round team stat" });
    }
};

// DELETE /roundTeamStats/:id - Delete a round team stat
const deleteRoundTeamStat = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.roundTeamStat.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete round team stat" });
    }
};

module.exports = {
    getRoundTeamStats,
    getRoundTeamStatById,
    createRoundTeamStat,
    updateRoundTeamStat,
    deleteRoundTeamStat,
};
