const express = require("express");
const controller = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  adminAndSuperadmin,
  onlySuperAdmin,
} = require("../middlewares/permissions");

router.put("/change-password", auth, controller.changePassword);
router.post("/create", adminAndSuperadmin, controller.create);
router.get("/my-info", auth, controller.getInfo);
router.get("/get-all", onlySuperAdmin, controller.getAll);
router.get("/get-user/:id", adminAndSuperadmin, controller.getUser);
router.put("/:id", adminAndSuperadmin, controller.update);
router.delete("/:id", adminAndSuperadmin, controller.deleteUser);

module.exports = router;
