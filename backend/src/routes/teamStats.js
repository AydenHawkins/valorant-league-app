const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /team-stats - Retrieve all team stats
router.get('/', async (req, res) => {
    try {
        const stats = await prisma.teamStats.findMany({
            include: {
                team: true,
                match: { include: { series: true } }
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /team-stats/:id - Retrieve team stats by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stat = await prisma.teamStats.findUnique({
            where: { id: Number(id) },
            include: {
                team: true,
                match: { include: { series: true } }
            }
        });
        if (!stat) return res.status(404).json({ error: 'TeamStats not found' });
        res.json(stat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /team-stats/team/:teamId - Retrieve all team stats for a specific team
router.get('/team/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
        const stats = await prisma.teamStats.findMany({
            where: { teamId: Number(teamId) },
            include: {
                team: true,
                match: { include: { series: true } }
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /team-stats/map/:matchId - Retrieve all team stats for a specific map
router.get('/map/:matchId', async (req, res) => {
    const { matchId } = req.params;
    try {
        const stats = await prisma.teamStats.findMany({
            where: { matchId: Number(matchId) },
            include: {
                team: true,
                match: { include: { series: true } }
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /team-stats - Create team stats
router.post('/', async (req, res) => {
    const {
        matchId,
        teamId,
        attackWins,
        defenseWins,
        postPlantsWon,
        roundsPlayed,
        roundsWon,
        roundsLost,
        winPercent
    } = req.body;

    try {
        const newStat = await prisma.teamStats.create({
            data: {
                matchId,
                teamId,
                attackWins,
                defenseWins,
                postPlantsWon,
                roundsPlayed,
                roundsWon,
                roundsLost,
                winPercent
            }
        });
        res.json(newStat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /team-stats/:id - Update team stats
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedStat = await prisma.teamStats.update({
            where: { id: Number(id) },
            data: updates
        });
        res.json(updatedStat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /team-stats/:id - Delete team stats
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.teamStats.delete({ where: { id: Number(id) } });
        res.json({ message: 'TeamStats deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;