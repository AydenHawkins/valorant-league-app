const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /matches - Retrieve all matches
router.get('/', async (req, res) => {
    try {
        const matches = await prisma.match.findMany({
            include: { homeTeam: true, awayTeam: true, season: true },
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
        const { homeTeamId, awayTeamId, seasonId, matchDate, map } = req.body;
        const match = await prisma.match.create({
            data: {
                homeTeam: { connect: { id: homeTeamId } },
                awayTeam: { connect: { id: awayTeamId } },
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