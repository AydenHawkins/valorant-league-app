import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../../middleware/auth.middleware";
import {
  getRounds,
  getRoundById,
  createRound,
  updateRound,
  deleteRound,
} from "./rounds.controller";

const router = Router();

router.get("/", getRounds);
router.get("/:id", getRoundById);
router.post("/", authenticateToken, requireAdmin(), createRound);
router.patch("/:id", authenticateToken, requireAdmin(), updateRound);
router.delete("/:id", authenticateToken, requireAdmin(), deleteRound);

export default router;
