/*
==================================================
EMAIL API ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");

const router = express.Router();

const emailController = require("../controllers/emailController");

/* ==================================================
   SEND TEST EMAIL
================================================== */

router.post(

    "/test",

    emailController.sendTestEmail

);

module.exports = router;