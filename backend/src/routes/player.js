const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /players - Retrieve all players
router.get('/', async (req, res) => {
    try {
        const players = await prisma.player.findMany(
            {
                include: { team: true },
                orderBy: { id: 'asc' },
            }
        );
        res.json(players);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /players - Create a new player
router.post('/', async (req, res) => {
    try {
        const { riotId, discordId, teamId } = req.body;
        const player = await prisma.player.create({
            data: {
                riotId,
                discordId,
                team: { connect: { id: teamId } },
            }
        });
        res.status(201).json(player);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;