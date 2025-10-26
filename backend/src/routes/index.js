const express = require("express");
const router = express.Router();

const agentsRoutes = require("./agents.routes");
const mapsRoutes = require("./maps.routes");
const leagueRoutes = require("./leagues.routes");
const seasonsRoutes = require("./seasons.routes");
const teamsRoutes = require("./teams.routes");
const playersRoutes = require("./players.routes");
const seriesRoutes = require("./series.routes");
const matchesRoutes = require("./matches.routes");
const matchParticipationsRoutes = require("./matchParticipations.routes");
const roundRoutes = require("./rounds.routes");
const plantRoutes = require("./plants.routes");
const defuseRoutes = require("./defuses.routes");

router.use("/agents", agentsRoutes);
router.use("/maps", mapsRoutes);
router.use("/leagues", leagueRoutes);
router.use("/seasons", seasonsRoutes);
router.use("/teams", teamsRoutes);
router.use("/players", playersRoutes);
router.use("/series", seriesRoutes);
router.use("/matches", matchesRoutes);
router.use("/matchParticipations", matchParticipationsRoutes);
router.use("/rounds", roundRoutes);
router.use("/plants", plantRoutes);
router.use("/defuses", defuseRoutes);

module.exports = router;
