const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// GET /defuses - Get all defuse records
router.get("/", async (req, res) => {
    try {
        const defuses = await prisma.defuse.findMany({
            include: {
                player: true,
                team: true,
                round: true,
            },
        });

        res.json(defuses);
    } catch (err) {
        console.error("Error fetching defuses:", err);
        res.status(500).json({ error: "Failed to fetch defuses" });
    }
});

// GET /defuses/round/:roundId - Get defuses by round ID
router.get("/round/:roundId", async (req, res) => {
    try {
        const { roundId } = req.params;
        const defuses = await prisma.defuse.findMany({
            where: { roundId: parseInt(roundId) },
            include: {
                player: true,
                team: true,
            },
        });

        res.json(defuses);
    } catch (err) {
        console.error("Error fetching defuses by round:", err);
        res.status(500).json({ error: "Failed to fetch defuses for this round" });
    }
});

// POST /defuses - Create a new defuse record
router.post("/", async (req, res) => {
    try {
        const { roundId, timeDefused, playerId, teamId } = req.body;
        const newDefuse = await prisma.defuse.create({
            data: {
                roundId,
                timeDefused,
                playerId,
                teamId,
            },
        });

        res.status(201).json(newDefuse);
    } catch (err) {
        console.error("Error creating defuse:", err);
        res.status(500).json({ error: "Failed to create defuse" });
    }
});

// Delete /defuses/:id - Delete a defuse record by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.defuse.delete({
            where: { id: parseInt(id) }
        });

        res.status(204).end();
    } catch (err) {
        console.error("Error deleting defuse:", err);
        res.status(500).json({ error: "Failed to delete defuse" });
    }
});

module.exports = router;