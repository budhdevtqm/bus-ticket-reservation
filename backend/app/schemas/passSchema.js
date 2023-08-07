const mongoose = require("mongoose");
const passengerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    permissions: String,
    createdAt: Number,
    updatedAt: Number,
  },
  {
    collection: "pessangers",
  }
);

module.exports = mongoose.model("passengers", passengerSchema);
