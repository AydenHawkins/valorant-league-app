import express from "express";
import {
    getLeagues,
    getLeagueById,
    createLeague,
    updateLeague,
    deleteLeague,
} from "./leagues.controller";

const router = express.Router();

router.get("/", getLeagues);
router.get("/:id", getLeagueById);
router.post("/", createLeague);
router.put("/:id", updateLeague);
router.delete("/:id", deleteLeague);

export default router;
