const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /series - Retrieve all series ordered by date descending
outer.get('/', async (req, res) => {
    try {
        const seriesList = await prisma.series.findMany({
            include: {
                season: true,
                redTeam: true,
                blueTeam: true,
                maps: {
                    include: {
                        playerStats: {
                            include: {
                                teamRoster: { include: { player: true, team: true, season: true } }
                            }
                        },
                        teamStats: { include: { team: true } },
                        rounds: {
                            include: {
                                plant: { include: { player: true } },
                                defuse: { include: { player: true } },
                                playerStats: { include: { player: true, team: true } }
                            }
                        },
                        substitutions: { include: { substitutedIn: true, substitutedOut: true, team: true } }
                    }
                }
            }
        });
        res.json(seriesList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /series/:id - Retrieve a series by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const series = await prisma.series.findUnique({
            where: { id: Number(id) },
            include: {
                season: true,
                redTeam: true,
                blueTeam: true,
                maps: {
                    include: {
                        playerStats: {
                            include: {
                                teamRoster: { include: { player: true, team: true, season: true } }
                            }
                        },
                        teamStats: { include: { team: true } },
                        rounds: {
                            include: {
                                plant: { include: { player: true } },
                                defuse: { include: { player: true } },
                                playerStats: { include: { player: true, team: true } }
                            }
                        },
                        substitutions: { include: { substitutedIn: true, substitutedOut: true, team: true } }
                    }
                }
            }
        });
        if (!series) return res.status(404).json({ error: 'Series not found' });
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create a new series
router.post('/', async (req, res) => {
    const { seasonId, redTeamId, blueTeamId, bestOf, startDate, endDate } = req.body;
    try {
        const newSeries = await prisma.series.create({
            data: {
                seasonId,
                redTeamId,
                blueTeamId,
                bestOf,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null
            }
        });
        res.json(newSeries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /series/:id - Update a series
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { seasonId, redTeamId, blueTeamId, bestOf, startDate, endDate } = req.body;
    try {
        const updatedSeries = await prisma.series.update({
            where: { id: Number(id) },
            data: {
                seasonId,
                redTeamId,
                blueTeamId,
                bestOf,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined
            }
        });
        res.json(updatedSeries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /series/:id - Delete a series
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.series.delete({ where: { id: Number(id) } });
        res.json({ message: 'Series deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;