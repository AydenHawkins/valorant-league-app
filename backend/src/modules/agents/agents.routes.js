const express = require("express");
const router = express.Router();
const {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
} = require("./agents.controller");

router.get("/", getAgents);
router.get("/:id", getAgentById);
router.post("/", createAgent);
router.patch("/:id", updateAgent);
router.delete("/:id", deleteAgent);

module.exports = router;
