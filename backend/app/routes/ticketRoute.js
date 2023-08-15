const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");

router.get("/:id", controller.getAll);

module.exports = router;
