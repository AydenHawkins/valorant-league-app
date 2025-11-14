const express = require("express");
const router = express.Router();
const {
  getSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries,
} = require("./series.controller");

router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.post("/", createSeries);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);

module.exports = router;
