const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  ticketId: String,
  amount: Number,
  currency: String,
  createdBy: String,
  createdAt: Number,
  updatedAt: Number,
  status: Boolean,
});

module.exports = mongoose.model("payment", paymentSchema);
