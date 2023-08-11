const controller = require("../controllers/busControllers");
const express = require("express");
const router = express.Router();
const {
  adminAndSuperadmin,
  onlySuperAdmin,
} = require("../middlewares/permissions");
const { route } = require("./userRoutes");

router.post("/add", adminAndSuperadmin, controller.create);
router.get("/allBuses", onlySuperAdmin, controller.getAll);
router.get("/:id", adminAndSuperadmin, controller.getBus);
router.delete("/:id", adminAndSuperadmin, controller.delete);
router.put("/update/:id", adminAndSuperadmin, controller.update);
router.get("/my-buses/:userId", adminAndSuperadmin, controller.getMyBuses);

module.exports = router;
