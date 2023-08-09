const controller = require("../controllers/busControllers");
const express = require("express");
const router = express.Router();

router.post("/", controller.create);

module.exports = router;
