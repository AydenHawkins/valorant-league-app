const prisma = require("..utils/prisma");

// GET /matchParticipations - Retrieve all match participations
const getMatchParticipations = async (req, res) => {
    try {
        const matchParticipations = await prisma.matchParticipation.findMany();
        res.status(200).json(matchParticipations);
    } catch (error) {
        console.error("Error retrieving match participations:", error);
        res.status(500).json({
            error: "Failed to retrieve match participations",
        });
    }
};

// GET /matchParticipations/:id - Retrieve a match participation by ID
const getMatchParticipationById = async (req, res) => {
    const { id } = req.params;
    try {
        const matchParticipation = await prisma.matchParticipation.findUnique({
            where: { id: parseInt(id) },
        });
        if (matchParticipation) {
            res.status(200).json(matchParticipation);
        } else {
            res.status(404).json({ error: "Match participation not found" });
        }
    } catch (error) {
        console.error("Error retrieving match participation:", error);
        res.status(500).json({
            error: "Failed to retrieve match participation",
        });
    }
};

// POST /matchParticipations - Create a new match participation
const createMatchParticipation = async (req, res) => {
    const { matchId, playerId, teamId, teamSide, agentId } = req.body;
    try {
        const newMatchParticipation = await prisma.matchParticipation.create({
            data: {
                matchId,
                playerId,
                teamId,
                teamSide,
                agentId: agentId ? agentId : null,
            },
        });
        res.status(201).json(newMatchParticipation);
    } catch (error) {
        console.error("Error creating match participation:", error);
        res.status(500).json({ error: "Failed to create match participation" });
    }
};

// PATCH /matchParticipations/:id - Update a match participation by ID
const updateMatchParticipation = async (req, res) => {
    const { id } = req.params;
    const { matchId, playerId, teamId, teamSide, agentId } = req.body;
    try {
        const updatedMatchParticipation =
            await prisma.matchParticipation.update({
                where: { id: parseInt(id) },
                data: { matchId, playerId, teamId, teamSide, agentId },
            });
        res.status(200).json(updatedMatchParticipation);
    } catch (error) {
        console.error("Error updating match participation:", error);
        res.status(500).json({ error: "Failed to update match participation" });
    }
};

// DELETE /matchParticipations/:id - Delete a match participation by ID
const deleteMatchParticipation = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.matchParticipation.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting match participation:", error);
        res.status(500).json({ error: "Failed to delete match participation" });
    }
};

module.exports = {
    getMatchParticipations,
    getMatchParticipationById,
    createMatchParticipation,
    updateMatchParticipation,
    deleteMatchParticipation,
};
