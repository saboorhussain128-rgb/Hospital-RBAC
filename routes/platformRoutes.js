const express = require("express");
const router = express.Router();

const platformController = require("../controllers/platformController");
const hospitalController = require("../controllers/hospitalController");
const hospitalAdminController = require("../controllers/hospitalAdminController");

const {
    isAuthenticated,
    isPlatformAdmin
} = require("../middleware/authMiddleware");

/* =====================================================
   PLATFORM AUTHENTICATION
===================================================== */

// Login Page
router.get("/login", platformController.loginPage);

// Login
router.post("/login", platformController.login);

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
    hospitalController.createHospital
);

// View Hospitals
router.get(
    "/view-hospital",
    isAuthenticated,
    isPlatformAdmin,
    hospitalController.viewHospitals
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

// Delete Hospital Admin
router.get(
    "/delete-hospital-admin/:id",
    isAuthenticated,
    isPlatformAdmin,
    hospitalAdminController.deleteAdmin
);

module.exports = router;