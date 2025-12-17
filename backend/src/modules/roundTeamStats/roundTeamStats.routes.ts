import express from "express";
import {
    getRoundTeamStats,
    getRoundTeamStatById,
    createRoundTeamStat,
    updateRoundTeamStat,
    deleteRoundTeamStat,
} from "./roundTeamStats.controller";

const router = express.Router();

router.get("/", getRoundTeamStats);
router.get("/:id", getRoundTeamStatById);
router.post("/", createRoundTeamStat);
router.put("/:id", updateRoundTeamStat);
router.delete("/:id", deleteRoundTeamStat);

export default router;
