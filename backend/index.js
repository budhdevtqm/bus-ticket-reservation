const express = require("express");
require("dotenv").config({ path: "./.env" });
const connectDb = require("./app/config/db").connectDb;
const userRoutes = require("./app/routes/userRoutes");
const authRoute = require("./app/routes/authRoute");
const busRoutes = require("./app/routes/busRoutes");

const cors = require("cors");

const app = express();
connectDb();

//common middlewares
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// body-parsers
app.use(express.json());

//users
app.use("/user", userRoutes);
// app.use("/user", userRoutes);
// app.use("/delete", userRoutes);
app.use("/get-all", userRoutes);

//SignUp
app.use("/signup", authRoute);

//login
app.use("/login", authRoute);

//Buses
// app.use("/bus", busRoutes);

app.listen(process.env.PORT || 400, () => console.log("server Started"));
