const express = require("express");
const router = express.Router();

const hospitalAdminController = require("../controllers/hospitalAdminController");

const { authenticate } = require("../middleware/apiAuth");
const { authorize } = require("../middleware/apiRBAC");

const {
    createHospitalAdminValidation,
    updateHospitalAdminValidation
} = require("../validators/hospitalAdminValidator");

/* =====================================================
   CREATE HOSPITAL ADMIN
   POST /api/hospital-admins
===================================================== */

router.post(
    "/",
    authenticate,
    authorize("platform_admin"),
    createHospitalAdminValidation,
    hospitalAdminController.createHospitalAdmin
);

/* =====================================================
   GET ALL HOSPITAL ADMINS
   GET /api/hospital-admins
===================================================== */

router.get(
    "/",
    authenticate,
    authorize("platform_admin"),
    hospitalAdminController.getHospitalAdmins
);

/* =====================================================
   GET HOSPITAL ADMIN BY ID
   GET /api/hospital-admins/:id
===================================================== */

router.get(
    "/:id",
    authenticate,
    authorize("platform_admin"),
    hospitalAdminController.getHospitalAdmin
);

/* =====================================================
   UPDATE HOSPITAL ADMIN
   PUT /api/hospital-admins/:id
===================================================== */

router.put(
    "/:id",
    authenticate,
    authorize("platform_admin"),
    updateHospitalAdminValidation,
    hospitalAdminController.updateHospitalAdmin
);

/* =====================================================
   DELETE HOSPITAL ADMIN
   DELETE /api/hospital-admins/:id
===================================================== */

router.delete(
    "/:id",
    authenticate,
    authorize("platform_admin"),
    hospitalAdminController.deleteHospitalAdmin
);

module.exports = router;