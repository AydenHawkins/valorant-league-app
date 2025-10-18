const prisma = require("../utilities/prisma");

const getSeasons = async (req, res) => {
    try {
        const seasons = await prisma.season.findMany();
        res.json(seasons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch seasons" });
    }
};

const getSeasonById = async (req, res) => {
    const { id } = req.params;
    try {
        const season = await prisma.season.findUnique({
            where: { id: parseInt(id) },
        });
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

const getSeasonsForLeague = async (req, res) => {
    const { leagueId } = req.params;
    try {
        const seasons = await prisma.season.findMany({
            where: { leagueId: parseInt(leagueId) },
        });
        res.json(seasons);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch seasons for league" });
    }
};

const createSeason = async (req, res) => {
    const { name, startDate, endDate } = req.body;
    try {
        const newSeason = await prisma.season.create({
            data: { name, startDate, endDate },
        });
        res.status(201).json(newSeason);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create season" });
    }
};

const updateSeason = async (req, res) => {
    const { id } = req.params;
    const { name, startDate, endDate } = req.body;
    try {
        const updatedSeason = await prisma.season.update({
            where: { id: parseInt(id) },
            data: { name, startDate, endDate },
        });
        res.json(updatedSeason);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update season" });
    }
};

const deleteSeason = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.season.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete season" });
    }
};

const createSeasonForLeague = async (req, res) => {
    const { leagueId } = req.params;
    const { name, startDate, endDate } = req.body;
    try {
        const newSeason = await prisma.season.create({
            data: {
                name,
                startDate,
                endDate,
                league: { connect: { id: parseInt(leagueId) } },
            },
        });
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
