const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

const { authenticate } = require("../middleware/apiAuth");

const { authorize } = require("../middleware/apiRBAC");

const {
    createDoctorValidation,
    updateDoctorValidation
} = require("../validators/doctorValidator");

/* =====================================================
   CREATE DOCTOR
   POST /api/doctors
===================================================== */

router.post(
    "/",
    authenticate,
    authorize("hospital_admin"),
    createDoctorValidation,
    doctorController.createDoctor
);

/* =====================================================
   GET ALL DOCTORS
   GET /api/doctors
===================================================== */

router.get(
    "/",
    authenticate,
    authorize("hospital_admin"),
    doctorController.getDoctors
);

/* =====================================================
   GET SINGLE DOCTOR
   GET /api/doctors/:id
===================================================== */

router.get(
    "/:id",
    authenticate,
    authorize("hospital_admin"),
    doctorController.getDoctor
);

/* =====================================================
   UPDATE DOCTOR
   PUT /api/doctors/:id
===================================================== */

router.put(
    "/:id",
    authenticate,
    authorize("hospital_admin"),
    updateDoctorValidation,
    doctorController.updateDoctor
);

/* =====================================================
   DELETE DOCTOR
   DELETE /api/doctors/:id
===================================================== */

router.delete(
    "/:id",
    authenticate,
    authorize("hospital_admin"),
    doctorController.deleteDoctor
);

module.exports = router;