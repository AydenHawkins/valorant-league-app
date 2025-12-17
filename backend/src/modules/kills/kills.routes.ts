import express from "express";
import {
    getKills,
    getKillById,
    createKill,
    updateKill,
    deleteKill,
} from "./kills.controller";

const router = express.Router();

router.get("/", getKills);
router.get("/:id", getKillById);
router.post("/", createKill);
router.put("/:id", updateKill);
router.delete("/:id", deleteKill);

export default router;
