import express from "express";
import {
    getRosters,
    getRosterById,
    createRoster,
    updateRoster,
    deleteRoster,
} from "./rosters.controller";

const router = express.Router();

router.get("/", getRosters);
router.get("/:id", getRosterById);
router.post("/", createRoster);
router.put("/:id", updateRoster);
router.delete("/:id", deleteRoster);

export default router;
