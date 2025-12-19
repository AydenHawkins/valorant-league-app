import express from "express";
import {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
} from "./players.controller";

const router = express.Router();

router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
