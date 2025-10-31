const express = require("express");
const router = express.Router();
const {
  getKills,
  getKillById,
  createKill,
  updateKill,
  deleteKill,
} = require("../controllers/kills.controller");

router.get("/", getKills);
router.get("/:id", getKillById);
router.post("/", createKill);
router.put("/:id", updateKill);
router.delete("/:id", deleteKill);

module.exports = router;
