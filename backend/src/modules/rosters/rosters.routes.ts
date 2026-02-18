import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
import {
  getRosters,
  getRosterById,
  createRoster,
  updateRoster,
  deleteRoster,
} from "./rosters.controller";

const router = Router();

router.get("/", getRosters);
router.get("/:id", getRosterById);
router.post("/", authenticateToken, createRoster);
router.patch("/:id", authenticateToken, updateRoster);
router.delete("/:id", authenticateToken, deleteRoster);

export default router;
