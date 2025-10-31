const prisma = require("..utilities/prisma");

// GET /plants - Retrieve all plants
const getPlants = async (req, res) => {
    try {
        const plants = await prisma.plants.findMany();
        res.status(200).json(plants);
    } catch (error) {
        console.error("Error fetching plants:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /plants/:id - Retrieve a plant by ID
const getPlantById = async (req, res) => {
    const { id } = req.params;
    try {
        const plant = await prisma.plants.findUnique({
            where: { id: parseInt(id) },
        });
        if (!plant) {
            return res.status(404).json({ error: "Plant not found" });
        }
        res.status(200).json(plant);
    } catch (error) {
        console.error("Error fetching plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// POST /plants - Create a new plant
const createPlant = async (req, res) => {
    const { roundId, playerId, roundTimeMs, site, locationX, locationY } =
        req.body;
    try {
        const newPlant = await prisma.plants.create({
            data: {
                roundId,
                playerId,
                roundTimeMs,
                site,
                locationX: locationX ? locationX : null,
                locationY: locationY ? locationY : null,
            },
        });
        res.status(201).json(newPlant);
    } catch (error) {
        console.error("Error creating plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /plants/:id - Update a plant by ID
const updatePlant = async (req, res) => {
    const { id } = req.params;
    const { roundId, playerId, roundTimeMs, site, locationX, locationY } =
        req.body;
    try {
        const updatedPlant = await prisma.plants.update({
            where: { id: parseInt(id) },
            data: {
                roundId,
                playerId,
                roundTimeMs,
                site,
                locationX,
                locationY,
            },
        });
        res.status(200).json(updatedPlant);
    } catch (error) {
        console.error("Error updating plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE /plants/:id - Delete a plant by ID
const deletePlant = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.plants.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
};
