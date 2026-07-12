/*
=====================================================
HOSPITAL AUTH ROUTES
Hospital RBAC System
=====================================================
*/

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/* =====================================================
   HOSPITAL ADMIN LOGIN
===================================================== */

// Login Page
router.get(
    "/login",
    authController.hospitalLoginPage
);

// Login
router.post(
    "/login",
    authController.hospitalLogin
);

/* =====================================================
   FORCE CHANGE PASSWORD
===================================================== */

// Change Password Page
router.get(
    "/change-password",
    authController.changePasswordPage
);

// Update Password
router.post(
    "/change-password",
    authController.changePassword
);

/* =====================================================
   LOGOUT
===================================================== */

router.get(
    "/logout",
    authController.logout
);

module.exports = router;