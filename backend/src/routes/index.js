const express = require("express");
const router = express.Router();

const agentsRoutes = require("./agents.routes");
const mapsRoutes = require("./maps.routes");

router.use("/agents", agentsRoutes);
router.use("/maps", mapsRoutes);

module.exports = router;
