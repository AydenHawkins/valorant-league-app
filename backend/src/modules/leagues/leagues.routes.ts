import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
import {
    getLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
} from "./leagues.controller";

const router = Router();

router.get("/", getLeagues);
router.get("/:id", getLeagueById);
router.post("/", authenticateToken, requireAdmin(), createLeague);
router.patch("/:id", authenticateToken, requireAdmin(), updateLeague);
router.delete("/:id", authenticateToken, requireAdmin(), deleteLeague);

export default router;
