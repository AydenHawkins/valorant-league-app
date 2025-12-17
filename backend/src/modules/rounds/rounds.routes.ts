import express from "express";
import {
    getRounds,
    getRoundById,
    createRound,
    updateRound,
    deleteRound,
} from "./rounds.controller";

const router = express.Router();

router.get("/", getRounds);
router.get("/:id", getRoundById);
router.post("/", createRound);
router.put("/:id", updateRound);
router.delete("/:id", deleteRound);

export default router;
