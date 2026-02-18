import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../../middleware/auth.middleware";
import {
  getSeasons,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason,
  getSeasonsForLeague,
  createSeasonForLeague,
} from "./seasons.controller";

const router = Router();

router.get("/", getSeasons);
router.get("/:id", getSeasonById);
router.post("/", authenticateToken, requireAdmin(), createSeason);
router.patch("/:id", authenticateToken, requireAdmin(), updateSeason);
router.delete("/:id", authenticateToken, requireAdmin(), deleteSeason);

// League-specific routes
router.get("/leagues/:leagueId/seasons", getSeasonsForLeague);
router.post(
  "/leagues/:leagueId/seasons",
  authenticateToken,
  requireAdmin(),
  createSeasonForLeague,
);

export default router;
