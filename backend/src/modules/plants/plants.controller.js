const plantsService = require("./plants.service");

// GET /plants - Retrieve all plants
const getPlants = async (req, res) => {
    try {
        const plants = await plantsService.getAllPlants();
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
        const plant = await plantsService.getPlantById(id);
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
    try {
        const newPlant = await plantsService.createPlant(req.body);
        res.status(201).json(newPlant);
    } catch (error) {
        console.error("Error creating plant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// PUT /plants/:id - Update a plant by ID
const updatePlant = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPlant = await plantsService.updatePlant(id, req.body);
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
        await plantsService.deletePlant(id);
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
