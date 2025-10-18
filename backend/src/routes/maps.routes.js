const express = require("express");
const router = express.Router();
const {
    getMaps,
    getMapById,
    createMap,
    updateMap,
    deleteMap,
} = require("../controllers/maps.controller");

router.get("/maps", getMaps);
router.get("/maps/:id", getMapById);
router.post("/maps", createMap);
router.patch("/maps/:id", updateMap);
router.delete("/maps/:id", deleteMap);

module.exports = router;
