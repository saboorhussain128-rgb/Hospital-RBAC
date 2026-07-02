const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
    isAuthenticated,
    isHospitalAdmin
} = require("../middleware/authMiddleware");

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
   HOSPITAL DASHBOARD
===================================================== */

router.get(
    "/dashboard",
    isAuthenticated,
    isHospitalAdmin,
    (req, res) => {

        res.render("hospital/dashboard", {

            admin: req.session.user

        });

    }
);

/* =====================================================
   LOGOUT
===================================================== */

router.get(
    "/logout",
    authController.logout
);

module.exports = router;