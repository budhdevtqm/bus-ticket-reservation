const controller = require("../controllers/busControllers");
const express = require("express");
const router = express.Router();
const {
  authAdmins,
  auth,
  authSuperAdmin,
} = require("../middlewares/authMiddleware");

router.post("/add-bus", authAdmins, controller.create);
router.get("/all-buses", authSuperAdmin, controller.getAll);
router.get("/my-buses", authAdmins, controller.myBuses);
router.get("/:id", auth, controller.getBus);
router.delete("/:id", authAdmins, controller.delete);
router.put("/update/:id", authAdmins, controller.update);

module.exports = router;
