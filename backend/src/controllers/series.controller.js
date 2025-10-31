const prisma = require("../utilities/prisma");

// GET /series - Retrieve all series
const getSeries = async (req, res) => {
  try {
    const series = await prisma.series.findMany();
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
    const series = await prisma.series.findUnique({
      where: { id: parseInt(id) },
    });
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
  const {
    seasonId,
    redTeamId,
    blueTeamId,
    bestOf,
    status,
    winnerTeamId,
    startDate,
    endDate,
  } = req.body;
  try {
    const newSeries = await prisma.series.create({
      data: {
        seasonId,
        redTeamId,
        blueTeamId,
        bestOf,
        status,
        winnerTeamId,
        startDate,
        endDate: endDate ? endDate : null,
      },
    });
    res.status(201).json(newSeries);
  } catch (error) {
    console.error("Error creating series:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /series/:id - Update an existing series
const updateSeries = async (req, res) => {
  const { id } = req.params;
  const {
    seasonId,
    redTeamId,
    blueTeamId,
    bestOf,
    status,
    winnerTeamId,
    startDate,
    endDate,
  } = req.body;
  try {
    const updatedSeries = await prisma.series.update({
      where: { id: parseInt(id) },
      data: {
        seasonId,
        redTeamId,
        blueTeamId,
        bestOf,
        status,
        winnerTeamId,
        startDate,
        endDate,
      },
    });
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
    await prisma.series.delete({
      where: { id: parseInt(id) },
    });
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
