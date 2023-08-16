const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");

router.get("/get-my-tickets/:userId", controller.getMyTickets);
router.get("/:id", controller.getAll);
router.put("/book/:id", controller.bookTicket);

module.exports = router;
