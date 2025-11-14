const substitutionsService = require("./substitutions.service");

// GET /substitutions - Retrieve all substitutions
const getSubstitutions = async (req, res) => {
  try {
    const substitutions = await substitutionsService.getAllSubstitutions();
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
    const substitution = await substitutionsService.getSubstitutionById(id);
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
  try {
    const substitution = await substitutionsService.createSubstitution(
      req.body,
    );
    res.status(201).json(substitution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create substitution" });
  }
};

// PUT /substitutions/:id - Update a substitution
const updateSubstitution = async (req, res) => {
  const { id } = req.params;
  try {
    const substitution = await substitutionsService.updateSubstitution(
      id,
      req.body,
    );
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
    await substitutionsService.deleteSubstitution(id);
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
