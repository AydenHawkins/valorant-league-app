const prisma = require("../utilities/prisma");

// GET /players - Retrieve all players
const getPlayers = async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /players/:id - Retrieve a player by ID
const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await prisma.player.findUnique({
      where: { id: parseInt(id) },
    });
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /players - Create a new player
const createPlayer = async (req, res) => {
  const { name, tag, puuid } = req.body;
  try {
    const newPlayer = await prisma.player.create({
      data: { name, tag, puuid },
    });
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /players/:id - Update an existing player
const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, tag, puuid } = req.body;
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: parseInt(id) },
      data: { name, tag, puuid },
    });
    res.json(updatedPlayer);
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /players/:id - Delete a player
const deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.player.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
