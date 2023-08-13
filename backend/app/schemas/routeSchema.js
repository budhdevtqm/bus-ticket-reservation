const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    busId: String,
    from: String,
    to: String,
    startTime: Number,
    endTime: Number,
    totalSeats: Number,
    ticketPrice: Number,
    date: Number,
    availableSeats: Number,
    updatedAt: Number,
    createdAt: Number,
  },
  { collection: "routes" }
);

module.exports = mongoose.model("route", routeSchema);
