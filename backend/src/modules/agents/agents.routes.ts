import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
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
router.post("/", authenticateToken, requireAdmin(), createAgent);
router.patch("/:id", authenticateToken, requireAdmin(), updateAgent);
router.delete("/:id", authenticateToken, requireAdmin(), deleteAgent);

export default router;
