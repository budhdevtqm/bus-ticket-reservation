const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/ticket-details/:id", auth, controller.getTicket);
router.get("/get-my-tickets", auth, controller.getMyTickets);
router.get("/:id", auth, controller.getAll);
router.put("/booking", auth, controller.bookTicket);
router.put("/cancel-ticket/:id", auth, controller.cancelTicket);
router.post("/ticket-payment", auth, controller.ticketPayment);

module.exports = router;
