const seriesService = require("./series.service");

// GET /series - Retrieve all series
const getSeries = async (req, res) => {
    try {
        const series = await seriesService.getAllSeries();
        res.json(series);
    } catch (error) {
        console.error("Error fetching series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET /series/:id - Retrieve a series by ID
const getSeriesById = async (req, res) => {
    const { id } = req.params;
    try {
        const series = await seriesService.getSeriesById(id);
        if (series) {
            res.json(series);
        } else {
            res.status(404).json({ error: "Series not found" });
        }
    } catch (error) {
        console.error("Error fetching series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// POST /series - Create a new series
const createSeries = async (req, res) => {
    try {
        const newSeries = await seriesService.createSeries(req.body);
        res.status(201).json(newSeries);
    } catch (error) {
        console.error("Error creating series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// PUT /series/:id - Update an existing series
const updateSeries = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSeries = await seriesService.updateSeries(id, req.body);
        res.json(updatedSeries);
    } catch (error) {
        console.error("Error updating series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE /series/:id - Delete a series
const deleteSeries = async (req, res) => {
    const { id } = req.params;
    try {
        await seriesService.deleteSeries(id);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting series:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getSeries,
    getSeriesById,
    createSeries,
    updateSeries,
    deleteSeries,
};
