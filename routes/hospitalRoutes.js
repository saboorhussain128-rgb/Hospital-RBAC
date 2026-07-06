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

const {
    createDoctorValidation
} = require("../validators/doctorValidator");

/* =====================================================
   HOSPITAL DASHBOARD
===================================================== */

router.get(
    "/dashboard",
    isAuthenticated,
    isHospitalAdmin,
    async (req, res) => {

        try {

            const admin = req.user || req.session.user;

            const doctorCount = await Doctor.countDocuments({

                hospital: admin.hospital

            });

            res.render("hospital/dashboard", {

                admin,

                doctorCount,

                hospitalName: admin.hospitalName || "Hospital"

            });

        }

        catch (error) {

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
    createDoctorValidation,
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
    createDoctorValidation,
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