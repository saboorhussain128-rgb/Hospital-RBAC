const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

const { checkPermission } = require("../middleware/rbacMiddleware");

const {
    isAuthenticated,
    isHospitalAdmin
} = require("../middleware/authMiddleware");

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
   CREATE DOCTOR
===================================================== */

router.get(
    "/create-doctor",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("create_doctor"),
    doctorController.createPage
);

router.post(
    "/create-doctor",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("create_doctor"),
    doctorController.createDoctor
);

/* =====================================================
   VIEW DOCTORS
===================================================== */

router.get(
    "/view-doctor",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("view_doctor"),
    doctorController.viewDoctors
);

/* =====================================================
   DELETE DOCTOR PAGE
===================================================== */

router.get(
    "/delete-doctor",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("delete_doctor"),
    doctorController.deleteDoctorPage
);

/* =====================================================
   DELETE DOCTOR
===================================================== */

router.get(
    "/delete-doctor/:id",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("delete_doctor"),
    doctorController.deleteDoctor
);

module.exports = router;