import { Router } from "express";
import { authenticateToken, requireAdmin } from "../../middleware/auth.middleware";
import {
    getSeries,
    getSeriesById,
    createSeries,
    updateSeries,
    deleteSeries,
} from "./series.controller";

const router = Router();

router.get("/", getSeries);
router.get("/:id", getSeriesById);
router.post("/", authenticateToken, requireAdmin(), createSeries);
router.patch("/:id", authenticateToken, requireAdmin(), updateSeries);
router.delete("/:id", authenticateToken, requireAdmin(), deleteSeries);

export default router;
