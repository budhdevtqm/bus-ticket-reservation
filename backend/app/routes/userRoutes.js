const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.post("/create", controller.create);
router.get("/users", controller.getAll);

module.exports = router;
