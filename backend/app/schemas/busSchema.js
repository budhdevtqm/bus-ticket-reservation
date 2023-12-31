const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNo: String,
    totalSeats: Number,
    createdAt: Number,
    model: String,
    createdBy: String,
    status: Boolean,
    updatedAt: Number,
    manufacturer: String,
  },
  {
    collection: "buses",
  }
);

module.exports = mongoose.model("bus", busSchema);
