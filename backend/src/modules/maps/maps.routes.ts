import express from "express";
import {
    getMaps,
    getMapById,
    createMap,
    updateMap,
    deleteMap,
} from "./maps.controller";

const router = express.Router();

router.get("/", getMaps);
router.get("/:id", getMapById);
router.post("/", createMap);
router.patch("/:id", updateMap);
router.delete("/:id", deleteMap);

export default router;
