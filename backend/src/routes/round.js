const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /rounds - Retrieve all rounds ordered by date descending
router.get('/', async (req, res) => {
    try {
        const rounds = await prisma.round.findMany({
            include: {
                mapGame: { include: { series: true } },
                plant: { include: { player: true } },
                defuse: { include: { player: true } },
                playerStats: { include: { player: true, team: true } }
            }
        });
        res.json(rounds);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /rounds/:id - Retrieve a round by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const round = await prisma.round.findUnique({
            where: { id: Number(id) },
            include: {
                mapGame: { include: { series: true } },
                plant: { include: { player: true } },
                defuse: { include: { player: true } },
                playerStats: { include: { player: true, team: true } }
            }
        });
        if (!round) return res.status(404).json({ error: 'Round not found' });
        res.json(round);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /rounds - Create a round
router.post('/', async (req, res) => {
    const { mapGameId, roundNumber, result, winningTeam, site, plantTimeMs, defuseTimeMs } = req.body;
    try {
        const newRound = await prisma.round.create({
            data: {
                mapGameId,
                roundNumber,
                result,
                winningTeam,
                site,
                plantTimeMs,
                defuseTimeMs
            }
        });
        res.json(newRound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /rounds/:id - Update a round
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { result, winningTeam, site, plantTimeMs, defuseTimeMs } = req.body;
    try {
        const updatedRound = await prisma.round.update({
            where: { id: Number(id) },
            data: { result, winningTeam, site, plantTimeMs, defuseTimeMs }
        });
        res.json(updatedRound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /rounds/:id - Delete a round
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.round.delete({ where: { id: Number(id) } });
        res.json({ message: 'Round deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;