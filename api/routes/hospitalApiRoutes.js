const express = require("express");

const router = express.Router();

const hospitalController = require("../controllers/hospitalController");

const { authenticate } = require("../middleware/apiAuth");

const { authorize } = require("../middleware/apiRBAC");

const {

    createHospitalValidation

} = require("../validators/hospitalValidator");

/* =====================================================
   CREATE HOSPITAL
===================================================== */

router.post(

    "/",

    authenticate,

    authorize("platform_admin"),

    createHospitalValidation,

    hospitalController.createHospital

);

/* =====================================================
   GET ALL HOSPITALS
===================================================== */

router.get(

    "/",

    authenticate,

    authorize("platform_admin"),

    hospitalController.getHospitals

);

/* =====================================================
   GET SINGLE HOSPITAL
===================================================== */

router.get(

    "/:id",

    authenticate,

    authorize("platform_admin"),

    hospitalController.getHospital

);

/* =====================================================
   UPDATE HOSPITAL
===================================================== */

router.put(

    "/:id",

    authenticate,

    authorize("platform_admin"),

    hospitalController.updateHospital

);

/* =====================================================
   DELETE HOSPITAL
===================================================== */

router.delete(

    "/:id",

    authenticate,

    authorize("platform_admin"),

    hospitalController.deleteHospital

);

module.exports = router;