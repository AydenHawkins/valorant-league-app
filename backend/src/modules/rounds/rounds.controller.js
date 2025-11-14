const roundsService = require("./rounds.service");

// GET /rounds - Retrieve all rounds
const getRounds = async (req, res) => {
    try {
        const rounds = await roundsService.getAllRounds();
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
        const round = await roundsService.getRoundById(id);
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
    try {
        const newRound = await roundsService.createRound(req.body);
        res.status(201).json(newRound);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create round" });
    }
};

// PUT /rounds/:id - Update a round by ID
const updateRound = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRound = await roundsService.updateRound(id, req.body);
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
        await roundsService.deleteRound(id);
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
