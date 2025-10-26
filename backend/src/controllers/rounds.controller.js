const prisma = require("..utilities/prisam");

// GET /rounds - Retrieve all rounds
const getRounds = async (req, res) => {
    try {
        const rounds = await prisma.round.findMany();
        res.status(200).json(rounds);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve rounds" });
    }
};

// GET /rounds/:id - Retrieve a round by ID
const getRoundById = async (req, res) => {
    const { id } = req.params;
    try {
        const round = await prisma.round.findUnique({
            where: { id: parseInt(id) },
        });
        if (round) {
            res.status(200).json(round);
        } else {
            res.status(404).json({ error: "Round not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve round" });
    }
};

// POST /rounds - Create a new round
const createRound = async (req, res) => {
    const { matchId, roundNumber, result, winningTeam } = req.body;
    try {
        const newRound = await prisma.round.create({
            data: { matchId, roundNumber, result, winningTeam },
        });
        res.status(201).json(newRound);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create round" });
    }
};

// PUT /rounds/:id - Update a round by ID
const updateRound = async (req, res) => {
    const { id } = req.params;
    const { matchId, roundNumber, result, winningTeam } = req.body;
    try {
        const updatedRound = await prisma.round.update({
            where: { id: parseInt(id) },
            data: { matchId, roundNumber, result, winningTeam },
        });
        res.status(200).json(updatedRound);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update round" });
    }
};

// DELETE /rounds/:id - Delete a round by ID
const deleteRound = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.round.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete round" });
    }
};

module.exports = {
    getRounds,
    getRoundById,
    createRound,
    updateRound,
    deleteRound,
};
