const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeControllers");

const {
  onlySuperAdmin,
  adminAndSuperadmin,
} = require("../middlewares/permissions");

router.post("/create", controller.create);
router.put("/update:id", controller.update);
router.get("/get-all", controller.getAll);
router.delete("/:id", controller.delete);
router.get("get/:id", controller.getRoute);

module.exports = router;
