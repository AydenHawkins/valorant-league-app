import express from "express";
import {
    previewMatchData,
    importMatchData,
    validateMatchData,
} from "./matchParser.controller";

const router = express.Router();

// Preview parsed match data before importing
router.post("/preview", previewMatchData);

// Import match data into database
router.post("/import", importMatchData);

// Validate match data format
router.post("/validate", validateMatchData);

export default router;
