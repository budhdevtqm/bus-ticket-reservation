const express = require("express");
const router = express.Router();
const controller = require("../controllers/routeControllers");
const { auth, authAdmins } = require("../middlewares/authMiddleware");

router.get("/get-route/:id", auth, controller.getRoute);
router.post("/create", authAdmins, controller.create);
router.put("/update/:id", authAdmins, controller.update);
router.get("/get-all", auth, controller.getAll);
router.delete("/:id", authAdmins, controller.delete);

module.exports = router;
