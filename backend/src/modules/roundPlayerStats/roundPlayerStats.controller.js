const roundPlayerStatsService = require("./roundPlayerStats.service");

// GET /roundPlayerStats - Retrieve all round player stats
const getRoundPlayerStats = async (req, res) => {
  try {
    const stats = await roundPlayerStatsService.getAllRoundPlayerStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve round player stats",
    });
  }
};

// GET /roundPlayerStats/:id - Retrieve a specific round player stat by ID
const getRoundPlayerStatById = async (req, res) => {
  const { id } = req.params;
  try {
    const stat = await roundPlayerStatsService.getRoundPlayerStatById(id);
    if (stat) {
      res.json(stat);
    } else {
      res.status(404).json({ error: "Round player stat not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve round player stat" });
  }
};

// POST /roundPlayerStats - Create a new round player stat
const createRoundPlayerStat = async (req, res) => {
  try {
    const newStat = await roundPlayerStatsService.createRoundPlayerStat(
      req.body,
    );
    res.status(201).json(newStat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create round player stat" });
  }
};

// PUT /roundPlayerStats/:id - Update an existing round player stat
const updateRoundPlayerStat = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStat = await roundPlayerStatsService.updateRoundPlayerStat(
      id,
      req.body,
    );
    res.json(updatedStat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update round player stat" });
  }
};

// DELETE /roundPlayerStats/:id - Delete a round player stat
const deleteRoundPlayerStat = async (req, res) => {
  const { id } = req.params;
  try {
    await roundPlayerStatsService.deleteRoundPlayerStat(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete round player stat" });
  }
};

module.exports = {
  getRoundPlayerStats,
  getRoundPlayerStatById,
  createRoundPlayerStat,
  updateRoundPlayerStat,
  deleteRoundPlayerStat,
};
