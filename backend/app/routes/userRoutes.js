const express = require("express");
const controller = require("../controllers/userController");
const {
  auth,
  authAdmins,
  authSuperAdmin,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.put("/change-password", auth, controller.changePassword);
router.post("/create", authAdmins, controller.create);
router.get("/my-info", auth, controller.getInfo);
router.get("/get-all", [auth, authSuperAdmin], controller.getAll);
router.get("/get-user/:id", authAdmins, controller.getUser);
router.put("/:id", authAdmins, controller.update);
router.delete("/:id", authAdmins, controller.deleteUser);

module.exports = router;
