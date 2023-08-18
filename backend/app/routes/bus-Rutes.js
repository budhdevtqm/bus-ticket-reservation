const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeControllers");
const { auth } = require("../middlewares/authMiddleware");

const {
  onlySuperAdmin,
  adminAndSuperadmin,
} = require("../middlewares/permissions");

router.get("/get-route/:id", controller.getRoute);
router.post("/create", adminAndSuperadmin, controller.create);
router.put("/update/:id", adminAndSuperadmin, controller.update);
router.get("/get-all", auth, controller.getAll);
router.delete("/:id", adminAndSuperadmin, controller.delete);

module.exports = router;
