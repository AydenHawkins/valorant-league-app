import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../../middleware/auth.middleware";
import {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} from "./matches.controller";

const router = Router();

router.get("/", getMatches);
router.get("/:id", getMatchById);
router.post("/", authenticateToken, requireAdmin(), createMatch);
router.patch("/:id", authenticateToken, requireAdmin(), updateMatch);
router.delete("/:id", authenticateToken, requireAdmin(), deleteMatch);

export default router;
