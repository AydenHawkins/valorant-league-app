const express = require("express");
const router = express.Router();
const {
    getRoundTeamStats,
    getRoundTeamStatById,
    createRoundTeamStat,
    updateRoundTeamStat,
    deleteRoundTeamStat,
} = require("../controllers/roundTeamStats.controller");

router.get("/", getRoundTeamStats);
router.get("/:id", getRoundTeamStatById);
router.post("/", createRoundTeamStat);
router.put("/:id", updateRoundTeamStat);
router.delete("/:id", deleteRoundTeamStat);

module.exports = router;
