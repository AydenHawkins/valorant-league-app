const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teams.controller");

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", createTeam);
router.patch("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
