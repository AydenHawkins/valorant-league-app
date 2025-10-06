const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /players - Retrieve all players
router.get('/', async (req, res) => {
    try {
        const players = await prisma.player.findMany(
            {
                orderBy: { id: 'asc' },
            }
        );
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /players/:id - Retrieve a specific player by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const player = await prisma.player.findUnique({
            where: { id: Number(id) },
        });
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json(player);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /players/:id/stats - Retrieve stats for a specific player by ID
router.get("/:id/stats", async (req, res) => {
    const playerId = parseInt(req.params.id);

    // Compute aggregates from PlayerStats
    const stats = await prisma.playerStats.aggregate({
        where: { teamRoster: { playerId } },
        _sum: { kills: true, deaths: true, assists: true, plants: true, defuses: true },
        _avg: { acs: true, adr: true, hsPercent: true, kast: true, clutchPercent: true },
    });

    res.json(stats);
});

// POST /players - Create a new player
router.post('/', async (req, res) => {
    try {
        const { name, tag, puuid } = req.body;
        const player = await prisma.player.create({
            data: { name, tag, puuid }
        });
        res.status(201).json(player);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//PUT /players/:id - Update a player by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, tag, puuid } = req.body;
    try {
        const player = await prisma.player.update({
            where: { id: Number(id) },
            data: { name, tag, puuid }
        });
        res.json(player);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /players/:id - Delete a player by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.player.delete({
            where: { id: Number(id) }
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;