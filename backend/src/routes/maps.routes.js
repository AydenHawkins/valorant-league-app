const express = require("express");
const router = express.Router();
const {
  getMaps,
  getMapById,
  createMap,
  updateMap,
  deleteMap,
} = require("../controllers/maps.controller");

router.get("/", getMaps);
router.get("/:id", getMapById);
router.post("/", createMap);
router.patch("/:id", updateMap);
router.delete("/:id", deleteMap);

module.exports = router;
