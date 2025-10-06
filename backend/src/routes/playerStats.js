const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /player-stats - Retrieve all player stats
router.get('/', async (req, res) => {
    try {
        const stats = await prisma.playerStats.findMany({
            include: {
                Match: { include: { series: true } },
                teamRoster: { include: { player: true, team: true, season: true } }
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /player-stats/:id - Retrieve player stats by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stat = await prisma.playerStats.findUnique({
            where: { id: Number(id) },
            include: {
                Match: { include: { series: true } },
                teamRoster: { include: { player: true, team: true, season: true } }
            }
        });
        if (!stat) return res.status(404).json({ error: 'PlayerStats not found' });
        res.json(stat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /player-stats/player/:playerId - Retrieve all stats for a specific player (across teams)
router.get('/player/:playerId', async (req, res) => {
    const { playerId } = req.params;
    try {
        const stats = await prisma.playerStats.findMany({
            where: { teamRoster: { playerId: Number(playerId) } },
            include: {
                Match: { include: { series: true } },
                teamRoster: { include: { player: true, team: true, season: true } }
            }
        });
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /player-stats - Create player stats
router.post('/', async (req, res) => {
    const {
        MatchId,
        teamRosterId,
        kills,
        deaths,
        assists,
        acs,
        adr,
        hsPercent,
        kast,
        fkills,
        fdeaths,
        plants,
        defuses,
        clutches,
        clutchPercent,
        agent
    } = req.body;

    try {
        const newStat = await prisma.playerStats.create({
            data: {
                MatchId,
                teamRosterId,
                kills,
                deaths,
                assists,
                acs,
                adr,
                hsPercent,
                kast,
                fkills,
                fdeaths,
                plants,
                defuses,
                clutches,
                clutchPercent,
                agent
            }
        });
        res.json(newStat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /player-stats/:id - Update player stats
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedStat = await prisma.playerStats.update({
            where: { id: Number(id) },
            data: updates
        });
        res.json(updatedStat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /player-stats/:id - Delete player stats
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.playerStats.delete({ where: { id: Number(id) } });
        res.json({ message: 'PlayerStats deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;