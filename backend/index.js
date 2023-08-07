const express = require("express");
require("dotenv").config({ path: "./.env" });
const connectDb = require("./app/config/db").connectDb;
const passRoute = require("./app/routes/passRoutes");
const authRoute = require("./app/routes/authRoute");
const busRoutes = require("./app/routes/busRoutes");

const cors = require("cors");

const app = express();
connectDb();

//common middlewares
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));

//body-parsers
app.use(express.json());

//Passengers
app.use("/passengers", passRoute);

//SignUp
app.use("/signup", authRoute);

//login
app.use("/login", authRoute);

//Buses
app.use("/bus", busRoutes);

app.listen(process.env.PORT || 400, () => console.log("server Started"));
