const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const apiAuth = require("../middleware/apiAuth");

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
   PROFILE
===================================================== */

router.get(
    "/profile",
    apiAuth,
    authController.profile
);

/* =====================================================
   LOGOUT
===================================================== */

router.post(
    "/logout",
    apiAuth,
    authController.logout
);

module.exports = router;