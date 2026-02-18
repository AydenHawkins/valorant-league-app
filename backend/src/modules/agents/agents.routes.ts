import { Router } from "express";
import {
    getAgents,
    getAgentById,
    createAgent,
    updateAgent,
    deleteAgent,
} from "./agents.controller";

const router = Router();

router.get("/", getAgents);
router.get("/:id", getAgentById);
router.post("/", createAgent);
router.patch("/:id", updateAgent);
router.delete("/:id", deleteAgent);

export default router;
