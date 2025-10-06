const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /plants - Get all plant records
router.get("/", async (req, res) => {
    try {
        const plants = await prisma.plant.findMany({
            include: {
                player: true,
                team: true,
                round: true,
            },
        });

        res.json(plants);
    } catch (err) {
        console.error("Error fetching plants:", err);
        res.status(500).json({ error: "Failed to fetch plants" });
    }
});

// GET /plants/round/:roundId - Get plants by round ID
router.get("/round/:roundId", async (req, res) => {
    try {
        const { roundId } = req.params;

        const plants = await prisma.plant.findMany({
            where: { roundId: parseInt(roundId) },
            include: {
                player: true,
                team: true,
            },
        });

        res.json(plants);
    } catch (err) {
        console.error("Error fetching plants by round:", err);
        res.status(500).json({ error: "Failed to fetch plants for this round" });
    }
});

// POST /plants - Create a new plant record
router.post("/", async (req, res) => {
    try {
        const { roundId, site, timePlanted, playerId, teamId } = req.body;

        const newPlant = await prisma.plant.create({
            data: {
                roundId,
                site,
                timePlanted,
                playerId,
                teamId,
            },
        });

        res.status(201).json(newPlant);
    } catch (err) {
        console.error("Error creating plant:", err);
        res.status(500).json({ error: "Failed to create plant" });
    }
});

// DELETE /plants/:id - Delete a plant record by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.plant.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).end();
    } catch (err) {
        console.error("Error deleting plant:", err);
        res.status(500).json({ error: "Failed to delete plant" });
    }
});

module.exports = router;