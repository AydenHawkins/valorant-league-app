const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /matches - Retrieve all matches
router.get('/', async (req, res) => {
    try {
        const matches = await prisma.match.findMany({
            include: { redTeam: true, blueTeam: true, season: true },
            orderBy: { matchDate: 'desc' },
        });
        res.json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /matches - Create a new match
router.post('/', async (req, res) => {
    try {
        const { redTeamId, blueTeamId, seasonId, matchDate, map } = req.body;
        const match = await prisma.match.create({
            data: {
                redTeam: { connect: { id: redTeamId } },
                blueTeam: { connect: { id: blueTeamId } },
                season: { connect: { id: seasonId } },
                matchDate,
                map
            }
        });
        res.status(201).json(match);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;