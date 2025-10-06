const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /maps - Retrieve all maps ordered by date descending
router.get('/', async (req, res) => {
    try {
        const maps = await prisma.Match.findMany({
            include: {
                series: {
                    include: { redTeam: true, blueTeam: true, season: true }
                },
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
        });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /maps/:id - Retrieve a map game by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const map = await prisma.Match.findUnique({
            where: { id: Number(id) },
            include: {
                series: {
                    include: { redTeam: true, blueTeam: true, season: true }
                },
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
        });
        if (!map) return res.status(404).json({ error: 'Match not found' });
        res.json(map);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /maps - Create a map game
router.post('/', async (req, res) => {
    const { seriesId, mapName, mapNumber, riotMatchId, matchDate } = req.body;
    try {
        const map = await prisma.Match.create({
            data: {
                seriesId,
                mapName,
                mapNumber,
                riotMatchId,
                matchDate: new Date(matchDate)
            }
        });
        res.json(map);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /maps/:id - Update a map game
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { seriesId, mapName, mapNumber, riotMatchId, matchDate } = req.body;
    try {
        const updatedMap = await prisma.Match.update({
            where: { id: Number(id) },
            data: {
                seriesId,
                mapName,
                mapNumber,
                riotMatchId,
                matchDate: matchDate ? new Date(matchDate) : undefined
            }
        });
        res.json(updatedMap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /maps/:id - Delete a map game
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.Match.delete({ where: { id: Number(id) } });
        res.json({ message: 'Match deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
