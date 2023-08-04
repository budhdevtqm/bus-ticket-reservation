const express = require("express");
require("dotenv").config({ path: "./.env" });
const connectDb = require("./app/config/db").connectDb;
const passRoute = require("./app/routes/passRoutes");
const authRoute = require("./app/routes/authRoute");

const app = express();
connectDb();

//body-parsers
app.use(express.json());

//Passengers
app.use("/passengers", passRoute);

//SignUp
app.use("/signup", authRoute);

//login
app.use("/login", authRoute);

app.listen(process.env.PORT || 400, () => console.log("server Started"));
