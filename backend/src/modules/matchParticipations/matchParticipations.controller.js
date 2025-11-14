const matchParticipationsService = require("./matchParticipations.service");

// GET /matchParticipations - Retrieve all match participations
const getMatchParticipations = async (req, res) => {
    try {
        const matchParticipations = await matchParticipationsService.getAllMatchParticipations();
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
        const matchParticipation = await matchParticipationsService.getMatchParticipationById(id);
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
    try {
        const newMatchParticipation = await matchParticipationsService.createMatchParticipation(req.body);
        res.status(201).json(newMatchParticipation);
    } catch (error) {
        console.error("Error creating match participation:", error);
        res.status(500).json({ error: "Failed to create match participation" });
    }
};

// PATCH /matchParticipations/:id - Update a match participation by ID
const updateMatchParticipation = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMatchParticipation = await matchParticipationsService.updateMatchParticipation(id, req.body);
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
        await matchParticipationsService.deleteMatchParticipation(id);
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
