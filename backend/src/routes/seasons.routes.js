const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getSeasons,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason,
  getSeasonsForLeague,
  createSeasonForLeague,
} = require("../controllers/seasons.controller");

router.get("/", getSeasons);
router.get("/:id", getSeasonById);
router.post("/", createSeason);
router.patch("/:id", updateSeason);
router.delete("/:id", deleteSeason);

router.get("/", getSeasonsForLeague);
router.post("/", createSeasonForLeague);

module.exports = router;
