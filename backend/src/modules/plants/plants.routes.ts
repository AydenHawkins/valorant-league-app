import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
import {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
} from "./plants.controller";

const router = Router();

router.get("/", getPlants);
router.get("/:id", getPlantById);
router.post("/", authenticateToken, requireAdmin(), createPlant);
router.patch("/:id", authenticateToken, requireAdmin(), updatePlant);
router.delete("/:id", authenticateToken, requireAdmin(), deletePlant);

export default router;
