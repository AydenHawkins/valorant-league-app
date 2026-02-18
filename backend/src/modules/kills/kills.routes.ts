import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../../middleware/auth.middleware";
import {
  getKills,
  getKillById,
  createKill,
  updateKill,
  deleteKill,
} from "./kills.controller";

const router = Router();

router.get("/", getKills);
router.get("/:id", getKillById);
router.post("/", authenticateToken, requireAdmin(), createKill);
router.patch("/:id", authenticateToken, requireAdmin(), updateKill);
router.delete("/:id", authenticateToken, requireAdmin(), deleteKill);

export default router;
