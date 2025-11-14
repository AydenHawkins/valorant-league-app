const express = require("express");
const router = express.Router();
const {
    getRosters,
    getRosterById,
    createRoster,
    updateRoster,
    deleteRoster,
} = require("./rosters.controller");

router.get("/", getRosters);
router.get("/:id", getRosterById);
router.post("/", createRoster);
router.put("/:id", updateRoster);
router.delete("/:id", deleteRoster);

module.exports = router;
