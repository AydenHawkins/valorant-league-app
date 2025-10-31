const express = require("express");
const router = express.Router();
const {
  getDefuses,
  getDefuseById,
  createDefuse,
  updateDefuse,
  deleteDefuse,
} = require("../controllers/defuses.controller");

router.get("/", getDefuses);
router.get("/:id", getDefuseById);
router.post("/", createDefuse);
router.put("/:id", updateDefuse);
router.delete("/:id", deleteDefuse);

module.exports = router;
