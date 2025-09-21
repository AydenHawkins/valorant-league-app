const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /teams - Retrieve all teams ordered by name
router.get('/', async (req, res) => {
    try {
        const teams = await prisma.team.findMany(
            {
                include: { season: true },
                orderBy: { name: 'asc' },
            }
        );
        res.json(teams);
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
            data: {
                name,
                season: { connect: { id: seasonId } },
            }
        });
        res.status(201).json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;