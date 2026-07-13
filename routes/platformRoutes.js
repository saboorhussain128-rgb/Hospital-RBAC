/*
==================================================
PLATFORM ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

/* ==================================================
   IMPORT CONTROLLERS
================================================== */

const platformController = require("../controllers/platformController");
const hospitalController = require("../controllers/hospitalController");
const hospitalAdminController = require("../controllers/hospitalAdminController");
const reportsController = require("../controllers/reportsController");

/* ==================================================
   IMPORT VALIDATORS
================================================== */

const {
    createHospitalValidation
} = require("../validators/hospitalValidator");

/* ==================================================
   IMPORT MIDDLEWARE
================================================== */

const {
    isAuthenticated,
    isPlatformAdmin
} = require("../middleware/authMiddleware");

/* =====================================================
   PLATFORM AUTHENTICATION
===================================================== */

// Login Page
router.get(
    "/login",
    platformController.loginPage
);

// Login
router.post(
    "/login",
    platformController.login
);

// Dashboard
router.get(
    "/dashboard",
    isAuthenticated,
    isPlatformAdmin,
    platformController.dashboard
);

// Logout
router.get(
    "/logout",
    isAuthenticated,
    isPlatformAdmin,
    platformController.logout
);

/* =====================================================
   HOSPITAL MANAGEMENT
===================================================== */

// Create Hospital Page
router.get(
    "/create-hospital",
    isAuthenticated,
    isPlatformAdmin,
    hospitalController.createPage
);

// Create Hospital
router.post(
    "/create-hospital",
    isAuthenticated,
    isPlatformAdmin,
    createHospitalValidation,

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.render("platform/createHospital", {

                errors: errors.array(),

                body: req.body

            });

        }

        next();

    },

    hospitalController.createHospital
);

// View Hospitals
router.get(
    "/view-hospital",
    isAuthenticated,
    isPlatformAdmin,
    hospitalController.viewHospitals
);

// Edit Hospital Page
router.get(
    "/edit-hospital/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalController.editPage
);

// Update Hospital
router.post(
    "/edit-hospital/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalController.updateHospital
);

// Delete Hospital
router.get(
    "/delete-hospital/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalController.deleteHospital
);

/* =====================================================
   HOSPITAL ADMIN MANAGEMENT
===================================================== */

// Create Hospital Admin Page
router.get(
    "/create-hospital-admin",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.createPage
);

// Create Hospital Admin
router.post(
    "/create-hospital-admin",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.createAdmin
);

// View Hospital Admins
router.get(
    "/view-hospital-admin",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.viewAdmins
);

// Edit Hospital Admin Page
router.get(
    "/edit-hospital-admin/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.editPage
);

// Update Hospital Admin
router.post(
    "/edit-hospital-admin/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.updateAdmin
);

// Delete Hospital Admin
router.get(
    "/delete-hospital-admin/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.deleteAdmin
);

/* =====================================================
   REPORTS
===================================================== */

router.get(
    "/reports",
    isAuthenticated,
    isPlatformAdmin,
    reportsController.dashboard
);

/* =====================================================
   AUDIT LOGS
===================================================== */

router.get(
    "/audit-logs",
    isAuthenticated,
    isPlatformAdmin,
    platformController.viewAuditLogs
);

/* =====================================================
   EXPORT ROUTER
===================================================== */

module.exports = router;