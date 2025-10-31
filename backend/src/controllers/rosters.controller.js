const prisma = require("../utilities/prisma");

// GET /rosters - Retrieve all rosters
const getRosters = async (req, res) => {
  try {
    const rosters = await prisma.roster.findMany();
    res.json(rosters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rosters" });
  }
};

// GET /rosters/:id - Retrieve a roster by ID
const getRosterById = async (req, res) => {
  const { id } = req.params;
  try {
    const roster = await prisma.roster.findUnique({
      where: { id: parseInt(id) },
    });
    if (roster) {
      res.json(roster);
    } else {
      res.status(404).json({ error: "Roster not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roster" });
  }
};

// POST /rosters - Create a new roster
const createRoster = async (req, res) => {
  const { teamId, playerId, seasonId, startDate, endDate } = req.body;
  try {
    const roster = await prisma.roster.create({
      data: {
        teamId,
        playerId,
        seasonId,
        startDate,
        endDate: endDate ? endDate : null,
      },
    });
    res.status(201).json(roster);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create roster" });
  }
};

// PUT /rosters/:id - Update a roster by ID
const updateRoster = async (req, res) => {
  const { id } = req.params;
  const { teamId, playerId, seasonId, startDate, endDate } = req.body;
  try {
    const roster = await prisma.roster.update({
      where: { id: parseInt(id) },
      data: {
        teamId,
        playerId,
        seasonId,
        startDate,
        endDate,
      },
    });
    res.json(roster);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update roster" });
  }
};

// DELETE /rosters/:id - Delete a roster by ID
const deleteRoster = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.roster.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete roster" });
  }
};

module.exports = {
  getRosters,
  getRosterById,
  createRoster,
  updateRoster,
  deleteRoster,
};
