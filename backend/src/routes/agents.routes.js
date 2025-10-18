const express = require("express");
const router = express.Router();
const {
  getAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
} = require("../controllers/agents.controller");

router.get("/agents", getAgents);
router.get("/agents/:id", getAgentById);
router.post("/agents", createAgent);
router.patch("/agents/:id", updateAgent);
router.delete("/agents/:id", deleteAgent);

module.exports = router;
