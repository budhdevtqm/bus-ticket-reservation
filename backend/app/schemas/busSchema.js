const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNo: String,
    from: String,
    to: String,
    time: Number,
    totalSeats: Number,
    bookedSeats: Number,
    createdAt: Number,
    updatedAt: Number,
    isAvailableToday: Boolean,
  },
  {
    collection: "busses",
  }
);

module.exports = mongoose.model("bus", busSchema);
