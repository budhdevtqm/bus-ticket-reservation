const mongoose = require("mongoose");
const passengerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    Permissions: String,
    createdAt: Number,
    updatedAt: Number,
  },
  {
    collection: "pessangers",
  }
);

module.exports = mongoose.model("passengers", passengerSchema);
