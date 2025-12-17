import express from "express";
import {
    getSeasons,
    getSeasonById,
    createSeason,
    updateSeason,
    deleteSeason,
    getSeasonsForLeague,
    createSeasonForLeague,
} from "./seasons.controller";

const router = express.Router();

router.get("/", getSeasons);
router.get("/:id", getSeasonById);
router.post("/", createSeason);
router.put("/:id", updateSeason);
router.delete("/:id", deleteSeason);

// League-specific routes
router.get("/leagues/:leagueId/seasons", getSeasonsForLeague);
router.post("/leagues/:leagueId/seasons", createSeasonForLeague);

export default router;
