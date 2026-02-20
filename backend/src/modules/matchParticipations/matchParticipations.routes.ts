import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../../middleware/auth.middleware";
import {
  getMatchParticipations,
  getMatchParticipationById,
  createMatchParticipation,
  updateMatchParticipation,
  deleteMatchParticipation,
} from "./matchParticipations.controller";

const router = Router();

router.get("/", getMatchParticipations);
router.get("/:id", getMatchParticipationById);
router.post("/", authenticateToken, requireAdmin(), createMatchParticipation);
router.patch(
  "/:id",
  authenticateToken,
  requireAdmin(),
  updateMatchParticipation,
);
router.delete(
  "/:id",
  authenticateToken,
  requireAdmin(),
  deleteMatchParticipation,
);

export default router;
