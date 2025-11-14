const express = require("express");
const router = express.Router();
const {
  getSeasons,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason,
  getSeasonsForLeague,
  createSeasonForLeague,
} = require("./seasons.controller");

router.get("/", getSeasons);
router.get("/:id", getSeasonById);
router.post("/", createSeason);
router.put("/:id", updateSeason);
router.delete("/:id", deleteSeason);

// League-specific routes
router.get("/leagues/:leagueId/seasons", getSeasonsForLeague);
router.post("/leagues/:leagueId/seasons", createSeasonForLeague);

module.exports = router;
