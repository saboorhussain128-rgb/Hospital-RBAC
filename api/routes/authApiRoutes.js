const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
    authenticate
} = require("../middleware/apiAuth");

/* =====================================================
   PLATFORM ADMIN LOGIN
===================================================== */

router.post(
    "/platform/login",
    authController.platformLogin
);

/* =====================================================
   HOSPITAL ADMIN LOGIN
===================================================== */

router.post(
    "/hospital/login",
    authController.hospitalLogin
);

/* =====================================================
   CURRENT USER PROFILE
===================================================== */

router.get(
    "/profile",
    authenticate,
    authController.profile
);

/* =====================================================
   LOGOUT
===================================================== */

router.post(
    "/logout",
    authenticate,
    authController.logout
);

module.exports = router;