import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
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
router.post("/", authenticateToken, requireAdmin(), createRoundPlayerStat);
router.patch("/:id", authenticateToken, requireAdmin(), updateRoundPlayerStat);
router.delete("/:id", authenticateToken, requireAdmin(), deleteRoundPlayerStat);

export default router;
