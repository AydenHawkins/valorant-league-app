const express = require("express");
const router = express.Router();
const {
    getLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
} = require("../controllers/leagues.controller");
const seasonRouts = require("./seasons.routes");

router.get("/", getLeagues);
router.get("/:id", getLeagueById);
router.post("/", createLeague);
router.patch("/:id", updateLeague);
router.delete("/:id", deleteLeague);

router.use("/:leagueId/seasons", seasonRouts);

module.exports = router;
