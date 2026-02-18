import { Router } from "express";
import {
    authenticateToken,
    requireAdmin,
} from "../../middleware/auth.middleware";
import {
    getPlayers,
    getPlayerById,
    createPlayer,
    generateInviteCode,
    updatePlayer,
    deletePlayer,
} from "./players.controller";

const router = Router();

router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.post("/", authenticateToken, requireAdmin(), createPlayer);
router.post(
    "/:id/invite-code",
    authenticateToken,
    requireAdmin(),
    generateInviteCode,
);
router.patch("/:id", authenticateToken, requireAdmin(), updatePlayer);
router.delete("/:id", authenticateToken, requireAdmin(), deletePlayer);

export default router;
