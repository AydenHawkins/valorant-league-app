import express from "express";
import {
    getSeries,
    getSeriesById,
    createSeries,
    updateSeries,
    deleteSeries,
} from "./series.controller";

const router = express.Router();

router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.post("/", createSeries);
router.put("/:id", updateSeries);
router.delete("/:id", deleteSeries);

export default router;
