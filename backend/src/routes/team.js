const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /teams - Retrieve all teams ordered by name
router.get('/', async (req, res) => {
    try {
        const teams = await prisma.team.findMany(
            {
                include: { rosters: true, redSeries: true, blueSeries: true, teamStats: true, substitutions: true, roundPlayerStats: true },
                orderBy: { name: 'asc' },
            }
        );
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /teams/:id - Retrieve a specific team by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const team = await prisma.team.findUnique({
            where: { id: Number(id) },
            include: { rosters: true, redSeries: true, blueSeries: true, teamStats: true, substitutions: true, roundPlayerStats: true },
        });
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /teams/:id/stats - Retrieve stats for a specific team by ID
router.get("/:id/stats", async (req, res) => {
    try {
        const teamId = parseInt(req.params.id);
        const { seasonId, seriesId } = req.query;

        const whereClause = { teamId };

        if (seasonId) {
            whereClause.Match = { series: { seasonId: parseInt(seasonId) } };
        }

        if (seriesId) {
            whereClause.Match = { seriesId: parseInt(seriesId) };
        }

        const stats = await prisma.teamStats.aggregate({
            where: whereClause,
            _sum: {
                roundsPlayed: true,
                roundsWon: true,
                roundsLost: true,
                attackWins: true,
                defenseWins: true,
                postPlantsWon: true,
            },
        });

        let winPercent = null;
        if (stats._sum.roundsPlayed && stats._sum.roundsPlayed > 0) {
            winPercent = (stats._sum.roundsWon / stats._sum.roundsPlayed) * 100;
        }

        res.json({
            ...stats._sum,
            winPercent,
        });
    } catch (err) {
        console.error("Error fetching team stats:", err);
        res.status(500).json({ error: "Failed to fetch team stats" });
    }
});

// POST /teams - Create a new team
router.post('/', async (req, res) => {
    try {
        const { name, seasonId } = req.body;
        const team = await prisma.team.create({
            data: { name }
        });
        res.status(201).json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//PUT /teams/:id - Update a team by ID
router.put('/id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const team = await prisma.team.update({
            where: { id: Number(id) },
            data: { name }
        });
        res.json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /teams/:id - Delete a team by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.team.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;