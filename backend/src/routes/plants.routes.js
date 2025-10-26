const express = require("express");
const router = express.Router();
const {
    getPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant,
} = require("../controllers/plants.controller");

router.get("/", getPlants);
router.get("/:id", getPlantById);
router.post("/", createPlant);
router.put("/:id", updatePlant);
router.delete("/:id", deletePlant);

module.exports = router;
