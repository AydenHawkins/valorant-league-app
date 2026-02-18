import { Router } from "express";
import {
    getRoundTeamStats,
    getRoundTeamStatById,
    createRoundTeamStat,
    updateRoundTeamStat,
    deleteRoundTeamStat,
} from "./roundTeamStats.controller";

const router = Router();

router.get("/", getRoundTeamStats);
router.get("/:id", getRoundTeamStatById);
router.post("/", createRoundTeamStat);
router.put("/:id", updateRoundTeamStat);
router.delete("/:id", deleteRoundTeamStat);

export default router;
