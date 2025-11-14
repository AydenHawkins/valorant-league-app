const express = require("express");
const router = express.Router();
const {
    getLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
} = require("./leagues.controller");

router.get("/", getLeagues);
router.get("/:id", getLeagueById);
router.post("/", createLeague);
router.put("/:id", updateLeague);
router.delete("/:id", deleteLeague);

module.exports = router;
