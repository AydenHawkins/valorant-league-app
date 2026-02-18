import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
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
router.post("/", authenticateToken, requireAdmin(), createRoundTeamStat);
router.patch("/:id", authenticateToken, requireAdmin(), updateRoundTeamStat);
router.delete("/:id", authenticateToken, requireAdmin(), deleteRoundTeamStat);

export default router;
