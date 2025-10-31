const prisma = require("..utilities/prisma");

// GET /substitutions - Retrieve all substitutions
const getSubstitutions = async (req, res) => {
  try {
    const substitutions = await prisma.substitution.findMany();
    res.json(substitutions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch substitutions" });
  }
};

// GET /substitutions/:id - Retrieve a substitution by ID
const getSubstitutionById = async (req, res) => {
  const { id } = req.params;
  try {
    const substitution = await prisma.substitution.findUnique({
      where: { id: parseInt(id) },
    });
    if (substitution) {
      res.json(substitution);
    } else {
      res.status(404).json({ error: "Substitution not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch substitution" });
  }
};

// POST /substitutions - Create a new substitution
const createSubstitution = async (req, res) => {
  const { matchId, teamId, substitutedInId, substitutedOutId, timeStamp } =
    req.body;
  try {
    const substitution = await prisma.substitution.create({
      data: {
        matchId,
        teamId,
        substitutedInId,
        substitutedOutId,
        timeStamp,
      },
    });
    res.status(201).json(substitution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create substitution" });
  }
};

// PUT /substitutions/:id - Update a substitution
const updateSubstitution = async (req, res) => {
  const { id } = req.params;
  const { matchId, teamId, substitutedInId, substitutedOutId, timeStamp } =
    req.body;
  try {
    const substitution = await prisma.substitution.update({
      where: { id: parseInt(id) },
      data: {
        matchId,
        teamId,
        substitutedInId,
        substitutedOutId,
        timeStamp,
      },
    });
    res.json(substitution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update substitution" });
  }
};
// DELETE /substitutions/:id - Delete a substitution
const deleteSubstitution = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.substitution.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete substitution" });
  }
};

module.exports = {
  getSubstitutions,
  getSubstitutionById,
  createSubstitution,
  updateSubstitution,
  deleteSubstitution,
};
