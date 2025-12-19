import express from "express";
import {
    getSubstitutions,
    getSubstitutionById,
    createSubstitution,
    updateSubstitution,
    deleteSubstitution,
} from "./substitutions.controller";

const router = express.Router();

router.get("/", getSubstitutions);
router.get("/:id", getSubstitutionById);
router.post("/", createSubstitution);
router.put("/:id", updateSubstitution);
router.delete("/:id", deleteSubstitution);

export default router;
