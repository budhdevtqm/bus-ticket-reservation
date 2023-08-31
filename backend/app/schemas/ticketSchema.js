const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    busId: String,
    routeId: String,
    price: Number,
    assignedTo: String,
    isCanceled: Boolean,
    booked: Boolean,
    seatNumber: Number,
    bookedOn: Number,
    seaterName: String,
    age: Number,
    isAvailable: Boolean,
  },
  {
    collection: "tickets",
  }
);

module.exports = mongoose.model("ticket", ticketSchema);
