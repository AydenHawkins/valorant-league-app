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

module.exports = router;