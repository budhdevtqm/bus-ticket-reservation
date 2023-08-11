const express = require("express");
require("dotenv").config({ path: "./.env" });
const connectDb = require("./app/config/db").connectDb;
const userRoutes = require("./app/routes/userRoutes");
const authRoute = require("./app/routes/authRoute");
const busRoutes = require("./app/routes/busRoutes");
const busRutes = require("./app/routes/busRutes");
const { verifyToken } = require("./app/middlewares/verifyToken");

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

//Auth
app.use("/signup", authRoute);
app.use("/login", authRoute);
app.use("/auth", authRoute);

//verify-token-middleware;
app.use(verifyToken);

//users
app.use("/user", userRoutes);
app.use("/get-user", userRoutes);
app.use("/delete", userRoutes);
app.use("/get-all", userRoutes);
app.use("/update", userRoutes);

//Buses
app.use("/bus", busRoutes);
app.use("/bus", busRoutes);
app.use("/bus", busRoutes);
app.use("/bus", busRoutes);
app.use("/bus", busRoutes);
app.use("/bus", busRoutes);

//bus-rutes
app.use("/bus-route", busRutes);

app.listen(process.env.PORT || 400, () => console.log("server Started"));
