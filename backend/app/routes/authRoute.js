const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/new",
  [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").notEmpty().withMessage("Email is Required"),
    body("password").notEmpty().withMessage("Password is Required"),
  ],
  controller.signup
);

router.post(
  "/user",
  [
    body("email").notEmpty().withMessage("Email is Required"),
    body("password").notEmpty().withMessage("Password is Required"),
  ],
  controller.login
);

// router.post("/checkToken", controller.checkToken);

module.exports = router;
