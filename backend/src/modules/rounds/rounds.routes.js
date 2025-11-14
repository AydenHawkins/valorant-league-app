const express = require("express");
const router = express.Router();
const {
    getRounds,
    getRoundById,
    createRound,
    updateRound,
    deleteRound,
} = require("./rounds.controller");

router.get("/", getRounds);
router.get("/:id", getRoundById);
router.post("/", createRound);
router.put("/:id", updateRound);
router.delete("/:id", deleteRound);

module.exports = router;
