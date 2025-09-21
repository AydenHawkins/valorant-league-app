const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /player-stats - Retrieve all player stats
router.get('/', async (req, res) => {
    try {
        const playerStats = await prisma.playerStats.findMany({
            include: { player: true, match: true },
            orderBy: { id: 'asc' },
        });
        res.json(playerStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST /player-stats - Create a new player stat
router.post('/', async (req, res) => {
    try {
        const {
            playerId,
            matchId,
            kills,
            deaths,
            assists,
            acs,
            plusMinus,
            kdRatio,
            delta,
            adr,
            hs,
            kast,
            fkills,
            fdeaths,
            mkills,
            plants,
            defuses,
            clutches,
            clutchpercent,
            agents,
        } = req.body;

        const stat = await prisma.playerStats.create({
            data: {
                player: { connect: { id: playerId } },
                match: { connect: { id: matchId } },
                kills,
                deaths,
                assists,
                acs,
                plusMinus,
                kdRatio,
                delta,
                adr,
                hs,
                kast,
                fkills,
                fdeaths,
                mkills,
                plants,
                defuses,
                clutches,
                clutchpercent,
                agents,
            },
        });

        res.status(201).json(stat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;