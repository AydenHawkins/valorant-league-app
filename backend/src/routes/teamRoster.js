const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /team-rosters - Retrieve all team rosters
router.get('/', async (req, res) => {
    try {
        const rosters = await prisma.teamRoster.findMany({
            include: {
                player: true,
                team: true,
                season: true,
                playerStats: true
            }
        });
        res.json(rosters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// GET /team-rosters/:id - Retrieve roster by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const roster = await prisma.teamRoster.findUnique({
            where: { id: Number(id) },
            include: {
                player: true,
                team: true,
                season: true,
                playerStats: true
            }
        });
        if (!roster) return res.status(404).json({ error: 'TeamRoster not found' });
        res.json(roster);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /team-rosters/team/:teamId - Retrieve all rosters for a specific team
router.get('/team/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
        const rosters = await prisma.teamRoster.findMany({
            where: { teamId: Number(teamId) },
            include: {
                player: true,
                season: true,
                playerStats: true
            }
        });
        res.json(rosters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /team-rosters/season/:seasonId - Retrieve all rosters for a specific season
router.get('/season/:seasonId', async (req, res) => {
    const { seasonId } = req.params;
    try {
        const rosters = await prisma.teamRoster.findMany({
            where: { seasonId: Number(seasonId) },
            include: {
                player: true,
                team: true,
                playerStats: true
            }
        });
        res.json(rosters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /team-rosters/player/:playerId - Retrieve all rosters for a specific player
router.get('/player/:playerId', async (req, res) => {
    const { playerId } = req.params;
    try {
        const rosters = await prisma.teamRoster.findMany({
            where: { playerId: Number(playerId) },
            include: {
                team: true,
                season: true,
                playerStats: true
            }
        });
        res.json(rosters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /team-rosters - Create a new roster entry
router.post('/', async (req, res) => {
    const { playerId, teamId, seasonId, startDate, endDate } = req.body;
    try {
        const roster = await prisma.teamRoster.create({
            data: {
                playerId,
                teamId,
                seasonId,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : null
            }
        });
        res.json(roster);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /team-rosters/:id - Update a roster entry (e.g., set endDate when player leaves)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedRoster = await prisma.teamRoster.update({
            where: { id: Number(id) },
            data: updates
        });
        res.json(updatedRoster);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /team-rosters/:id - Delete a roster entry
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.teamRoster.delete({ where: { id: Number(id) } });
        res.json({ message: 'TeamRoster deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
