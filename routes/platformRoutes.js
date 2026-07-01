const express = require("express");

const router = express.Router();

const platformController = require("../controllers/platformController");

router.get("/login", platformController.loginPage);

module.exports = router;