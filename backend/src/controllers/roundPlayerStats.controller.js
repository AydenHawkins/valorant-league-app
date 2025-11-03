const prisma = require("../utils/prisma");

// GET /roundPlayerStats - Retrieve all round player stats
const getRoundPlayerStats = async (req, res) => {
    try {
        const stats = await prisma.roundPlayerStat.findMany();
        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve round player stats",
        });
    }
};

// GET /roundPlayerStats/:id - Retrieve a specific round player stat by ID
const getRoundPlayerStatById = async (req, res) => {
    const { id } = req.params;
    try {
        const stat = await prisma.roundPlayerStat.findUnique({
            where: { id: parseInt(id) },
        });
        if (stat) {
            res.json(stat);
        } else {
            res.status(404).json({ error: "Round player stat not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve round player stat" });
    }
};

// POST /roundPlayerStats - Create a new round player stat
const createRoundPlayerStat = async (req, res) => {
    const {
        roundId,
        matchParticipationId,
        playerId,
        score,
        kills,
        headshots,
        bodyshots,
        legshots,
        grenadeCasts,
        ability1Casts,
        ability2Casts,
        ultimateCasts,
        loadoutValue,
        creditsRemaining,
        weaponId,
        weaponName,
        armorId,
        armorName,
    } = req.body;
    try {
        const newStat = await prisma.roundPlayerStat.create({
            data: {
                roundId,
                matchParticipationId,
                playerId,
                score,
                kills,
                headshots,
                bodyshots,
                legshots,
                grenadeCasts: grenadeCasts ? grenadeCasts : null,
                ability1Casts: ability1Casts ? ability1Casts : null,
                ability2Casts: ability2Casts ? ability2Casts : null,
                ultimateCasts: ultimateCasts ? ultimateCasts : null,
                loadoutValue: loadoutValue ? loadoutValue : null,
                creditsRemaining: creditsRemaining ? creditsRemaining : null,
                weaponId: weaponId ? weaponId : null,
                weaponName: weaponName ? weaponName : null,
                armorId: armorId ? armorId : null,
                armorName: armorName ? armorName : null,
            },
        });
        res.status(201).json(newStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create round player stat" });
    }
};

// PUT /roundPlayerStats/:id - Update an existing round player stat
const updateRoundPlayerStat = async (req, res) => {
    const { id } = req.params;
    const {
        roundId,
        matchParticipationId,
        playerId,
        score,
        kills,
        headshots,
        bodyshots,
        legshots,
        grenadeCasts,
        ability1Casts,
        ability2Casts,
        ultimateCasts,
        loadoutValue,
        creditsRemaining,
        weaponId,
        weaponName,
        armorId,
        armorName,
    } = req.body;
    try {
        const updatedStat = await prisma.roundPlayerStat.update({
            where: { id: parseInt(id) },
            data: {
                roundId,
                matchParticipationId,
                playerId,
                score,
                kills,
                headshots,
                bodyshots,
                legshots,
                grenadeCasts,
                ability1Casts,
                ability2Casts,
                ultimateCasts,
                loadoutValue,
                creditsRemaining,
                weaponId,
                weaponName,
                armorId,
                armorName,
            },
        });
        res.json(updatedStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update round player stat" });
    }
};

// DELETE /roundPlayerStats/:id - Delete a round player stat
const deleteRoundPlayerStat = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.roundPlayerStat.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete round player stat" });
    }
};

module.exports = {
    getRoundPlayerStats,
    getRoundPlayerStatById,
    createRoundPlayerStat,
    updateRoundPlayerStat,
    deleteRoundPlayerStat,
};
