import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
import {
    getMaps,
    getMapById,
    createMap,
    updateMap,
    deleteMap,
} from "./maps.controller";

const router = Router();

router.get("/", getMaps);
router.get("/:id", getMapById);
router.post("/", authenticateToken, requireAdmin(), createMap);
router.patch("/:id", authenticateToken, requireAdmin(), updateMap);
router.delete("/:id", authenticateToken, requireAdmin(), deleteMap);

export default router;
