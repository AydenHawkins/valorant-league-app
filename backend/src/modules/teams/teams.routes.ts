import { Router } from "express";
import {
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
} from "./teams.controller";

const router = Router();

router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
