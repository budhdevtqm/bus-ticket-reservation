const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.post("/create", controller.create);
router.get("/users", controller.getAll);
router.get("/:id", controller.getUser);

module.exports = router;
