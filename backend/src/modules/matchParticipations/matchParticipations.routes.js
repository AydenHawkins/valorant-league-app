const express = require("express");
const router = express.Router();
const {
  getMatchParticipations,
  getMatchParticipationById,
  createMatchParticipation,
  updateMatchParticipation,
  deleteMatchParticipation,
} = require("./matchParticipations.controller");

router.get("/", getMatchParticipations);
router.get("/:id", getMatchParticipationById);
router.post("/", createMatchParticipation);
router.patch("/:id", updateMatchParticipation);
router.delete("/:id", deleteMatchParticipation);

module.exports = router;
