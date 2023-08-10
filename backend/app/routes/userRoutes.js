const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();
const {
  adminAndSuperadmin,
  onlySuperAdmin,
} = require("../middlewares/permissions");

router.post("/create", adminAndSuperadmin, controller.create);
router.get("/users", onlySuperAdmin, controller.getAll);
router.get("/:id", adminAndSuperadmin, controller.getUser);
router.put("/:id", adminAndSuperadmin, controller.update);
router.delete("/:id", adminAndSuperadmin, controller.deleteUser);

module.exports = router;
