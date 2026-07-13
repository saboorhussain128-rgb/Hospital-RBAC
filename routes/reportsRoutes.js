/*
==================================================
REPORTS ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");

const router = express.Router();

const reportsController = require("../controllers/reportsController");

const {
    isAuthenticated,
    isPlatformAdmin
} = require("../middleware/authMiddleware");

/* ==================================================
   REPORTS DASHBOARD
================================================== */

router.get(

    "/",

    isAuthenticated,

    isPlatformAdmin,

    reportsController.dashboard

);

module.exports = router;