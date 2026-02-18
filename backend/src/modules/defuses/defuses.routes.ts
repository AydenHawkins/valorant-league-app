import { Router } from "express";
import {
    getDefuses,
    getDefuseById,
    createDefuse,
    updateDefuse,
    deleteDefuse,
} from "./defuses.controller";

const router = Router();

router.get("/", getDefuses);
router.get("/:id", getDefuseById);
router.post("/", createDefuse);
router.put("/:id", updateDefuse);
router.delete("/:id", deleteDefuse);

export default router;
