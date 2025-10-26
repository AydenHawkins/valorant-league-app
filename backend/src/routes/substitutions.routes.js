const express = require("express");
const router = express.Router();
const {
    getSubstitutions,
    getSubstitutionById,
    createSubstitution,
    updateSubstitution,
    deleteSubstitution,
} = require("../controllers/substitutions.controller");

router.get("/", getSubstitutions);
router.get("/:id", getSubstitutionById);
router.post("/", createSubstitution);
router.put("/:id", updateSubstitution);
router.delete("/:id", deleteSubstitution);

module.exports = router;
