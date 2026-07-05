const express = require("express");
const router = express.Router();

const { validationResult } = require("express-validator");

const hospitalAdminController = require("../controllers/hospitalAdminController");

const {
    createHospitalAdminValidation
} = require("../validators/hospitalAdminValidator");

/* DEBUG (REMOVE LATER) */

console.log("hospitalAdminController loaded:", hospitalAdminController);

/* =====================================================
   CREATE HOSPITAL ADMIN PAGE
===================================================== */

router.get(
    "/create-hospital-admin",
    hospitalAdminController.createPage
);

/* =====================================================
   CREATE HOSPITAL ADMIN
===================================================== */

router.post(

    "/create-hospital-admin",

    createHospitalAdminValidation,

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.render("platform/createHospitalAdmin", {

                errors: errors.array(),
                formData: req.body

            });

        }

        next();

    },

    hospitalAdminController.createAdmin

);

/* =====================================================
   VIEW HOSPITAL ADMINS
===================================================== */

router.get(
    "/view-hospital-admin",
    hospitalAdminController.viewAdmins
);

/* =====================================================
   DELETE HOSPITAL ADMIN
===================================================== */

router.get(
    "/delete-hospital-admin/:id",
    hospitalAdminController.deleteAdmin
);

module.exports = router;