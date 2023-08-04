const mongoose = require("mongoose");
require("dotenv").config({ path: "../../.env" });

module.exports.connectDb = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log("unable to connect DB", error);
  }
};
