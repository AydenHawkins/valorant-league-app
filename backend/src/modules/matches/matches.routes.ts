import express from "express";
import {
    getMatches,
    getMatchById,
    createMatch,
    updateMatch,
    deleteMatch,
} from "./matches.controller";

const router = express.Router();

router.get("/", getMatches);
router.get("/:id", getMatchById);
router.post("/", createMatch);
router.patch("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;
