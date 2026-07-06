/*
==================================================
AUTH API ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const { authenticate } = require("../middleware/apiAuth");

const {

    loginValidation

} = require("../validators/authValidator");

/* ==================================================
   PLATFORM ADMIN LOGIN
================================================== */

router.post(

    "/platform/login",

    loginValidation,

    authController.platformLogin

);

/* ==================================================
   HOSPITAL ADMIN LOGIN
================================================== */

router.post(

    "/hospital/login",

    loginValidation,

    authController.hospitalLogin

);

/* ==================================================
   PROFILE
================================================== */

router.get(

    "/profile",

    authenticate,

    authController.profile

);

/* ==================================================
   LOGOUT
================================================== */

router.post(

    "/logout",

    authenticate,

    authController.logout

);

module.exports = router;