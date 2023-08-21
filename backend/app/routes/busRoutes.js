const controller = require("../controllers/busControllers");
const express = require("express");
const router = express.Router();
const { authAdmins, auth } = require("../middlewares/authMiddleware");
const {
  adminAndSuperadmin,
  onlySuperAdmin,
} = require("../middlewares/permissions");
const { route } = require("./userRoutes");

router.post("/add-bus", authAdmins, controller.create);
router.get("/all-buses", authAdmins, controller.getAll);
router.get("/:id", auth, controller.getBus);
router.delete("/:id", adminAndSuperadmin, controller.delete);
router.put("/update/:id", adminAndSuperadmin, controller.update);

module.exports = router;
