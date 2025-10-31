const prisma = require("../utilities/prisma");

// GET /defuses - Retrieve all defuses
const getDefuses = async (req, res) => {
  try {
    const defuses = await prisma.defuse.findMany();
    res.status(200).json(defuses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve defuses" });
  }
};

// GET /defuses/:id - Retrieve a defuse by ID
const getDefuseById = async (req, res) => {
  const { id } = req.params;
  try {
    const defuse = await prisma.defuse.findUnique({
      where: { id: parseInt(id) },
    });
    if (defuse) {
      res.status(200).json(defuse);
    } else {
      res.status(404).json({ error: "Defuse not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve defuse" });
  }
};

// POST /defuses - Create a new defuse
const createDefuse = async (req, res) => {
  const { roundId, playerId, roundTimeMs, locationX, locationY } = req.body;
  try {
    const newDefuse = await prisma.defuse.create({
      data: {
        roundId,
        playerId,
        roundTimeMs,
        locationX: locationX ? locationX : null,
        locationY: locationY ? locationY : null,
      },
    });
    res.status(201).json(newDefuse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create defuse" });
  }
};

// PUT /defuses/:id - Update an existing defuse
const updateDefuse = async (req, res) => {
  const { id } = req.params;
  const { roundId, playerId, roundTimeMs, locationX, locationY } = req.body;
  try {
    const updatedDefuse = await prisma.defuse.update({
      where: { id: parseInt(id) },
      data: {
        roundId,
        playerId,
        roundTimeMs,
        locationX,
        locationY,
      },
    });
    res.status(200).json(updatedDefuse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update defuse" });
  }
};

// DELETE /defuses/:id - Delete a defuse
const deleteDefuse = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.defuse.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete defuse" });
  }
};

module.exports = {
  getDefuses,
  getDefuseById,
  createDefuse,
  updateDefuse,
  deleteDefuse,
};
