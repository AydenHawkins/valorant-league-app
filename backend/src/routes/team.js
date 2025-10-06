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