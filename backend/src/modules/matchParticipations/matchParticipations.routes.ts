import express from "express";
import {
    getMatchParticipations,
    getMatchParticipationById,
    createMatchParticipation,
    updateMatchParticipation,
    deleteMatchParticipation,
} from "./matchParticipations.controller";

const router = express.Router();

router.get("/", getMatchParticipations);
router.get("/:id", getMatchParticipationById);
router.post("/", createMatchParticipation);
router.patch("/:id", updateMatchParticipation);
router.delete("/:id", deleteMatchParticipation);

export default router;
