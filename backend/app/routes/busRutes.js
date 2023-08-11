const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeControllers");

const {
  onlySuperAdmin,
  adminAndSuperadmin,
} = require("../middlewares/permissions");

router.post("/create", controller.create);

module.exports = router;
