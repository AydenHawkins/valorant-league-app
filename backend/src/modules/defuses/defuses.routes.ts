import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
import {
    getDefuses,
    getDefuseById,
    createDefuse,
    updateDefuse,
    deleteDefuse,
} from "./defuses.controller";

const router = Router();

router.get("/", getDefuses);
router.get("/:id", getDefuseById);
router.post("/", authenticateToken, requireAdmin(), createDefuse);
router.patch("/:id", authenticateToken, requireAdmin(), updateDefuse);
router.delete("/:id", authenticateToken, requireAdmin(), deleteDefuse);

export default router;
