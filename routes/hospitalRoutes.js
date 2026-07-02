const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");

const { checkPermission } = require("../middleware/rbacMiddleware");

/* =====================================================
   HOSPITAL DASHBOARD
===================================================== */

router.get("/dashboard", (req, res) => {

    res.render("hospital/dashboard", {

        admin: req.session.hospitalAdmin

    });

});

/* =====================================================
   CREATE DOCTOR
===================================================== */

router.get(

    "/create-doctor",

    checkPermission("create_doctor"),

    doctorController.createPage

);

router.post(

    "/create-doctor",

    checkPermission("create_doctor"),

    doctorController.createDoctor

);

/* =====================================================
   VIEW DOCTORS
===================================================== */

router.get(

    "/view-doctor",

    checkPermission("view_doctor"),

    doctorController.viewDoctors

);

/* =====================================================
   EDIT DOCTOR
===================================================== */

router.get(

    "/edit-doctor/:id",

    checkPermission("view_doctor"),

    doctorController.editPage

);

router.post(

    "/edit-doctor/:id",

    checkPermission("create_doctor"),

    doctorController.updateDoctor

);

/* =====================================================
   DELETE DOCTOR
===================================================== */

router.get(

    "/delete-doctor/:id",

    checkPermission("delete_doctor"),

    doctorController.deleteDoctor

);

module.exports = router;