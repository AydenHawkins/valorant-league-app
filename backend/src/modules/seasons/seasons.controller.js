const seasonsService = require("./seasons.service");

// GET /seasons - Retrieve all seasons
const getSeasons = async (req, res) => {
    try {
        const seasons = await seasonsService.getAllSeasons();
        res.json(seasons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch seasons" });
    }
};

// GET /seasons/:id - Retrieve a season by ID
const getSeasonById = async (req, res) => {
    const { id } = req.params;
    try {
        const season = await seasonsService.getSeasonById(id);
        if (season) {
            res.json(season);
        } else {
            res.status(404).json({ error: "Season not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch season" });
    }
};

// GET /leagues/:leagueId/seasons - Retrieve all seasons for a specific league
const getSeasonsForLeague = async (req, res) => {
    const { leagueId } = req.params;
    try {
        const seasons = await seasonsService.getSeasonsForLeague(leagueId);
        res.json(seasons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch seasons for league" });
    }
};

// POST /seasons - Create a new season
const createSeason = async (req, res) => {
    try {
        const newSeason = await seasonsService.createSeason(req.body);
        res.status(201).json(newSeason);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create season" });
    }
};

// PUT /seasons/:id - Update an existing season
const updateSeason = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSeason = await seasonsService.updateSeason(id, req.body);
        res.json(updatedSeason);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update season" });
    }
};

// DELETE /seasons/:id - Delete a season
const deleteSeason = async (req, res) => {
    const { id } = req.params;
    try {
        await seasonsService.deleteSeason(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete season" });
    }
};

// POST /leagues/:leagueId/seasons - Create a new season for a specific league
const createSeasonForLeague = async (req, res) => {
    const { leagueId } = req.params;
    try {
        const newSeason = await seasonsService.createSeasonForLeague(leagueId, req.body);
        res.status(201).json(newSeason);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create season for league" });
    }
};

module.exports = {
    getSeasons,
    getSeasonById,
    createSeason,
    updateSeason,
    deleteSeason,
    getSeasonsForLeague,
    createSeasonForLeague,
};
