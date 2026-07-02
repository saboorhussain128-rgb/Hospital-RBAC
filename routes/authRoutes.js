const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// platform login
router.get("/platform/login", authController.platformLoginPage);
router.post("/platform/login", authController.platformLogin);

// hospital admin login
router.get("/hospital/login", authController.hospitalLoginPage);
router.post("/hospital/login", authController.hospitalLogin);

// logout
router.get("/logout", authController.logout);

module.exports = router;