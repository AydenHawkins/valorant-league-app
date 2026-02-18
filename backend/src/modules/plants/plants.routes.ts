import { Router } from "express";
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
router.post("/", createPlant);
router.put("/:id", updatePlant);
router.delete("/:id", deletePlant);

export default router;
