const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /round-player-stats - Retrieve all round player stats
router.get('/', async (req, res) => {
    try {
        const stats = await prisma.roundPlayerStats.findMany({
            include: {
                player: true,
                round: {
                    include: {
                        mapGame: {
                            include: { series: true }
                        }
                    }
                },
                team: true
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /round-player-stats/:id - Retrieve round player stats for a specific ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stat = await prisma.roundPlayerStats.findUnique({
            where: { id: Number(id) },
            include: {
                player: true,
                round: { include: { mapGame: true } },
                team: true
            }
        });
        if (!stat) return res.status(404).json({ error: 'RoundPlayerStats not found' });
        res.json(stat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /round-player-stats/round/:roundId - Retrieve round player stats for a specific round
router.get('/round/:roundId', async (req, res) => {
    const { roundId } = req.params;
    try {
        const stats = await prisma.roundPlayerStats.findMany({
            where: { roundId: Number(roundId) },
            include: {
                player: true,
                team: true
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /round-player-stats/player/:playerId - Retrieve round player stats for a specific player across all rounds
router.get('/player/:playerId', async (req, res) => {
    const { playerId } = req.params;
    try {
        const stats = await prisma.roundPlayerStats.findMany({
            where: { playerId: Number(playerId) },
            include: {
                round: { include: { mapGame: true } },
                team: true
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /round-player-stats - Create round player stats
router.post('/', async (req, res) => {
    const { playerId, roundId, teamId, kills, deaths, assists, damage, credits, score } = req.body;

    try {
        const newStats = await prisma.roundPlayerStats.create({
            data: {
                playerId,
                roundId,
                teamId,
                kills,
                deaths,
                assists,
                damage,
                credits,
                score
            }
        });
        res.json(newStats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /round-player-stats/:id - Update round player stats
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedStats = await prisma.roundPlayerStats.update({
            where: { id: Number(id) },
            data: updates
        });
        res.json(updatedStats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /round-player-stats/:id - Delete round player stats
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.roundPlayerStats.delete({ where: { id: Number(id) } });
        res.json({ message: 'RoundPlayerStats deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;