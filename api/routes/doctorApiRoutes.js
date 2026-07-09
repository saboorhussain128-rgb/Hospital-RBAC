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
===================================================== */

router.post(
    "/",
    authenticate,
    authorize("doctor.create"),
    createDoctorValidation,
    doctorController.createDoctor
);

/* =====================================================
   GET ALL DOCTORS
===================================================== */

router.get(
    "/",
    authenticate,
    authorize("doctor.view"),
    doctorController.getDoctors
);

/* =====================================================
   GET SINGLE DOCTOR
===================================================== */

router.get(
    "/:id",
    authenticate,
    authorize("doctor.view"),
    doctorController.getDoctor
);

/* =====================================================
   UPDATE DOCTOR
===================================================== */

router.put(
    "/:id",
    authenticate,
    authorize("doctor.update"),
    updateDoctorValidation,
    doctorController.updateDoctor
);

/* =====================================================
   DELETE DOCTOR
===================================================== */

router.delete(
    "/:id",
    authenticate,
    authorize("doctor.delete"),
    doctorController.deleteDoctor
);

module.exports = router;