import { Router } from "express";
import { authenticateToken } from "../../middleware/auth.middleware";
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
router.post("/", authenticateToken, createTeam);
router.patch("/:id", authenticateToken, updateTeam);
router.delete("/:id", authenticateToken, deleteTeam);

export default router;
