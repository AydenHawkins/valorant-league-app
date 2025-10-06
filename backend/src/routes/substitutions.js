const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

//GET /substitutions - Retrieve all substitutions
router.get('/', async (req, res) => {
    try {
        const subs = await prisma.substitution.findMany({
            include: {
                substitutedIn: true,
                substitutedOut: true,
                team: true,
                mapGame: { include: { series: true } }
            }
        });
        res.json(subs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /substitutions/:id - Retrieve substitution by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sub = await prisma.substitution.findUnique({
            where: { id: Number(id) },
            include: {
                substitutedIn: true,
                substitutedOut: true,
                team: true,
                mapGame: { include: { series: true } }
            }
        });
        if (!sub) return res.status(404).json({ error: 'Substitution not found' });
        res.json(sub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /substitutions/map/:mapGameId - Retrieve all substitutions for a specific map
router.get('/map/:mapGameId', async (req, res) => {
    const { mapGameId } = req.params;
    try {
        const subs = await prisma.substitution.findMany({
            where: { mapGameId: Number(mapGameId) },
            include: {
                substitutedIn: true,
                substitutedOut: true,
                team: true
            }
        });
        res.json(subs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /substitutions/team/:teamId - Retrieve all substitutions for a specific team
router.get('/team/:teamId', async (req, res) => {
    const { teamId } = req.params;
    try {
        const subs = await prisma.substitution.findMany({
            where: { teamId: Number(teamId) },
            include: {
                substitutedIn: true,
                substitutedOut: true,
                mapGame: true
            }
        });
        res.json(subs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /substitutions - Create a substitution record
router.post('/', async (req, res) => {
    const { substitutedInId, substitutedOutId, teamId, mapGameId, timestamp } = req.body;

    try {
        const newSub = await prisma.substitution.create({
            data: {
                substitutedInId,
                substitutedOutId,
                teamId,
                mapGameId,
                timestamp: timestamp ? new Date(timestamp) : undefined
            }
        });
        res.json(newSub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /substitutions/:id - Update a substitution (rarely needed, but included)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedSub = await prisma.substitution.update({
            where: { id: Number(id) },
            data: updates
        });
        res.json(updatedSub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /substitutions/:id - Delete a substitution
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.substitution.delete({ where: { id: Number(id) } });
        res.json({ message: 'Substitution deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});