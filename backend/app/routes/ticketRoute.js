const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/ticket-details/:id", auth, controller.getTicket);
router.get("/get-my-tickets", auth, controller.getMyTickets);
router.get("/:id", auth, controller.getAll);
router.post("/cancel/:id", auth, controller.cancelTicket);
router.put("/booking", auth, controller.bookTicket);
router.post("/ticket-payment", auth, controller.ticketPayment);

module.exports = router;
