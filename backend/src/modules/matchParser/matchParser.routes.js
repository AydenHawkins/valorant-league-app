const express = require("express");
const router = express.Router();
const {
    previewMatchData,
    importMatchData,
    validateMatchData,
} = require("./matchParser.controller");

// Preview parsed match data before importing
router.post("/preview", previewMatchData);

// Import match data into database
router.post("/import", importMatchData);

// Validate match data format
router.post("/validate", validateMatchData);

module.exports = router;
