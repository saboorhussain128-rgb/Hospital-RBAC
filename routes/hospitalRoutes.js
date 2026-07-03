const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

const Doctor = require("../models/Doctor");

const {
    isAuthenticated,
    isHospitalAdmin
} = require("../middleware/authMiddleware");

const {
    checkPermission
} = require("../middleware/rbacMiddleware");

/* =====================================================
   HOSPITAL DASHBOARD
===================================================== */

router.get(
    "/dashboard",
    isAuthenticated,
    isHospitalAdmin,
    async (req, res) => {

        try {

            const doctorCount = await Doctor.countDocuments({

                hospital: req.session.user.hospital

            });

            res.render("hospital/dashboard", {

                admin: req.session.user,

                doctorCount,

                hospitalName: req.session.user.hospitalName || "Hospital"

            });

        } catch (error) {

            console.log(error);

            res.send("Dashboard Error");

        }

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
   EDIT DOCTOR
===================================================== */

router.get(
    "/edit-doctor/:id",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("view_doctor"),
    doctorController.editPage
);

router.post(
    "/edit-doctor/:id",
    isAuthenticated,
    isHospitalAdmin,
    checkPermission("create_doctor"),
    doctorController.updateDoctor
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