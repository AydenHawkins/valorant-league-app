const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /seasons - Retrieve all seasons ordered by start date descending
router.get('/', async (req, res) => {
    try {
        const seasons = await prisma.season.findMany(
            {
                orderBy: { startDate: 'desc' },
            }
        );
        res.json(seasons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /seasons/:id - Retrieve a specific season by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const season = await prisma.season.findUnique({
            where: { id: Number(id) },
        });
        if (!season) {
            return res.status(404).json({ error: 'Season not found' });
        }
        res.json(season);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// POST /seasons - Create a new season
router.post('/', async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;
        const season = await prisma.season.create({
            data: {
                name,
                startDate: new Date,
                endDate: endDate ? new Date(endDate) : null,
            }
        });
        res.status(201).json(season);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//PUT /seasons/:id - Update a season by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, startDate, endDate } = req.body;
    try {
        const season = await prisma.season.update({
            where: { id: Number(id) },
            data: {
                name,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
            }
        });
        res.json(season);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /seasons/:id - Delete a season by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.season.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;