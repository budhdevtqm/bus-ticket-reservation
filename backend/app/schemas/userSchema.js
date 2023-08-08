const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    permissions: String,
    createdAt: Number,
    updatedAt: Number,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("user", userSchema);
