const express = require("express");
const router = express.Router();

const controller = require("../controllers/platformController");

// login
router.get("/login", controller.loginPage);
router.post("/login", controller.login);

// dashboard
router.get("/dashboard", controller.dashboard);

// logout
router.get("/logout", controller.logout);

module.exports = router;