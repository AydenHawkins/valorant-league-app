const express = require("express");
const router = express.Router();
const {
  getRoundPlayerStats,
  getRoundPlayerStatById,
  createRoundPlayerStat,
  updateRoundPlayerStat,
  deleteRoundPlayerStat,
} = require("../controllers/roundPlayerStats.controller");

router.get("/", getRoundPlayerStats);
router.get("/:id", getRoundPlayerStatById);
router.post("/", createRoundPlayerStat);
router.put("/:id", updateRoundPlayerStat);
router.delete("/:id", deleteRoundPlayerStat);

module.exports = router;
