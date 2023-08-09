const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNo: String,
    createdAt: Number,
    createdBy: String,
    status: Boolean,
    updatedAt: Number,
  },
  {
    collection: "busses",
  }
);

module.exports = mongoose.model("bus", busSchema);
