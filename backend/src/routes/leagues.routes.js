const express = require("express");
const router = express.Router();
const {
    getLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
} = require("../controllers/leagues.controller");

router.get("/leagues", getLeagues);
router.get("/leagues/:id", getLeagueById);
router.post("/leagues", createLeague);
router.patch("/leagues/:id", updateLeague);
router.delete("/leagues/:id", deleteLeague);

module.exports = router;
