import { Router } from "express";

const router = Router();

// Import routes from modules
import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";
import agentsRoutes from "../modules/agents/agents.routes";
import mapsRoutes from "../modules/maps/maps.routes";
import leagueRoutes from "../modules/leagues/leagues.routes";
import seasonsRoutes from "../modules/seasons/seasons.routes";
import teamsRoutes from "../modules/teams/teams.routes";
import playersRoutes from "../modules/players/players.routes";
import seriesRoutes from "../modules/series/series.routes";
import matchesRoutes from "../modules/matches/matches.routes";
import matchParticipationsRoutes from "../modules/matchParticipations/matchParticipations.routes";
import roundRoutes from "../modules/rounds/rounds.routes";
import plantRoutes from "../modules/plants/plants.routes";
import defuseRoutes from "../modules/defuses/defuses.routes";
import roundPlayerStatsRoutes from "../modules/roundPlayerStats/roundPlayerStats.routes";
import roundTeamStatsRoutes from "../modules/roundTeamStats/roundTeamStats.routes";
import killRoutes from "../modules/kills/kills.routes";
import rostersRoutes from "../modules/rosters/rosters.routes";
import substitutionRoutes from "../modules/substitutions/substitutions.routes";
import matchParserRoutes from "../modules/matchParser/matchParser.routes";

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
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

export default router;
