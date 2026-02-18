import { Router } from "express";
import {
    getRoundPlayerStats,
    getRoundPlayerStatById,
    createRoundPlayerStat,
    updateRoundPlayerStat,
    deleteRoundPlayerStat,
} from "./roundPlayerStats.controller";

const router = Router();

router.get("/", getRoundPlayerStats);
router.get("/:id", getRoundPlayerStatById);
router.post("/", createRoundPlayerStat);
router.put("/:id", updateRoundPlayerStat);
router.delete("/:id", deleteRoundPlayerStat);

export default router;
