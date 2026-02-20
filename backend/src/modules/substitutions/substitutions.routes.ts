import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../../middleware/auth.middleware";
import {
  getSubstitutions,
  getSubstitutionById,
  createSubstitution,
  updateSubstitution,
  deleteSubstitution,
} from "./substitutions.controller";

const router = Router();

router.get("/", getSubstitutions);
router.get("/:id", getSubstitutionById);
router.post("/", authenticateToken, requireAdmin(), createSubstitution);
router.patch("/:id", authenticateToken, requireAdmin(), updateSubstitution);
router.delete("/:id", authenticateToken, requireAdmin(), deleteSubstitution);

export default router;
