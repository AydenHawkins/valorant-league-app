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

// POST /playerstats - Create a new player stat
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
        res.status(500).json({ error: error.message });
    }
});

// PUT /playerstats/:id - Update an existing player stat
router.put('/:id', async (req, res) => {
    try {
        const statId = parseInt(req.params.id, 10);
        const data = req.body;

        const updatedStat = await prisma.playerStats.update({
            where: { id: statId },
            data: data,
            include: { player: true, match: true },
        });

        res.json(updatedStat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;