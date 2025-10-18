const express = require("express");
const router = express.Router();

const agentsRoutes = require("./agents.routes");
const mapsRoutes = require("./maps.routes");
const leagueRoutes = require("./leagues.routes");
const seasonsRoutes = require("./seasons.routes");

router.use("/agents", agentsRoutes);
router.use("/maps", mapsRoutes);
router.use("/leagues", leagueRoutes);
router.use("/seasons", seasonsRoutes);

module.exports = router;
