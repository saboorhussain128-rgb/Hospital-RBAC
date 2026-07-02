const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/* =====================================================
   HOSPITAL ADMIN LOGIN
===================================================== */

// Login Page
router.get("/login", authController.hospitalLoginPage);

// Login
router.post("/login", authController.hospitalLogin);

/* =====================================================
   LOGOUT
===================================================== */

router.get("/logout", authController.logout);

module.exports = router;