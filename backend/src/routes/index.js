const express = require("express");
const router = express.Router();

// Import routes from modules
const agentsRoutes = require("../modules/agents/agents.routes");
const mapsRoutes = require("../modules/maps/maps.routes");
const leagueRoutes = require("../modules/leagues/leagues.routes");
const seasonsRoutes = require("../modules/seasons/seasons.routes");
const teamsRoutes = require("../modules/teams/teams.routes");
const playersRoutes = require("../modules/players/players.routes");
const seriesRoutes = require("../modules/series/series.routes");
const matchesRoutes = require("../modules/matches/matches.routes");
const matchParticipationsRoutes = require("../modules/matchParticipations/matchParticipations.routes");
const roundRoutes = require("../modules/rounds/rounds.routes");
const plantRoutes = require("../modules/plants/plants.routes");
const defuseRoutes = require("../modules/defuses/defuses.routes");
const roundPlayerStatsRoutes = require("../modules/roundPlayerStats/roundPlayerStats.routes");
const roundTeamStatsRoutes = require("../modules/roundTeamStats/roundTeamStats.routes");
const killRoutes = require("../modules/kills/kills.routes");
const rostersRoutes = require("../modules/rosters/rosters.routes");
const substitutionRoutes = require("../modules/substitutions/substitutions.routes");
const matchParserRoutes = require("../modules/matchParser/matchParser.routes");

// Mount routes
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
router.use("/roundPlayerStats", roundPlayerStatsRoutes);
router.use("/roundTeamStats", roundTeamStatsRoutes);
router.use("/kills", killRoutes);
router.use("/rosters", rostersRoutes);
router.use("/substitutions", substitutionRoutes);
router.use("/matchParser", matchParserRoutes);

module.exports = router;
