const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  ticketIds: Array,
  createdBy: String,
  createdAt: Number,
  updatedAt: Number,
  status: Boolean,
  payment: {},
});

module.exports = mongoose.model("payment", paymentSchema);
