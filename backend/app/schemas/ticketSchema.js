const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    busId: String,
    routeId: String,
    assignedTo: String,
    isCanceled: Boolean,
    booked: Boolean,
    seatNumber: Number,
    bookedOn: Number,
  },
  {
    collection: "tickets",
  }
);

module.exports = mongoose.model("ticket", ticketSchema);
