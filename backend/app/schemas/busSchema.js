const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNo: String,
    createdAt: Number,
    model: String,
    createdBy: String,
    status: Boolean,
    updatedAt: Number,
    manufacturer: String,
  },
  {
    collection: "busses",
  }
);

module.exports = mongoose.model("bus", busSchema);
