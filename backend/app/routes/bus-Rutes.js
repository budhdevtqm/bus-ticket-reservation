const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeControllers");

const {
  onlySuperAdmin,
  adminAndSuperadmin,
} = require("../middlewares/permissions");

router.post("/create", adminAndSuperadmin, controller.create);
router.put("/update/:id", adminAndSuperadmin, controller.update);
router.get("/get-all", controller.getAll);
router.delete("/:id", adminAndSuperadmin, controller.delete);
router.get("/get-route/:id", controller.getRoute);

module.exports = router;
