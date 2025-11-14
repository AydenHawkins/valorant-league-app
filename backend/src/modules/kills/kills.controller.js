const killsService = require("./kills.service");

// GET /kills - Retrieve all kills
const getKills = async (req, res) => {
  try {
    const kills = await killsService.getAllKills();
    res.status(200).json(kills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve kills" });
  }
};

// GET /kills/:id - Retrieve a kill by ID
const getKillById = async (req, res) => {
  const { id } = req.params;
  try {
    const kill = await killsService.getKillById(id);
    if (kill) {
      res.status(200).json(kill);
    } else {
      res.status(404).json({ error: "Kill not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve kill" });
  }
};

// POST /kills - Create a new kill
const createKill = async (req, res) => {
  try {
    const newKill = await killsService.createKill(req.body);
    res.status(201).json(newKill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create kill" });
  }
};

// PUT /kills/:id - Update a kill by ID
const updateKill = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedKill = await killsService.updateKill(id, req.body);
    res.status(200).json(updatedKill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update kill" });
  }
};

// DELETE /kills/:id - Delete a kill by ID
const deleteKill = async (req, res) => {
  const { id } = req.params;
  try {
    await killsService.deleteKill(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete kill" });
  }
};

module.exports = {
  getKills,
  getKillById,
  createKill,
  updateKill,
  deleteKill,
};
