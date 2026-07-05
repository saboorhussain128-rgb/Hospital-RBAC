const { body } = require("express-validator");

/* =====================================================
   CREATE HOSPITAL VALIDATION
===================================================== */

exports.createHospitalValidation = [

    /* ===============================
       HOSPITAL NAME
    =============================== */

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Hospital name is required.")
        .isLength({ min: 3 })
        .withMessage("Hospital name must be at least 3 characters."),

    /* ===============================
       HOSPITAL ADDRESS
    =============================== */

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Hospital address is required.")
        .isLength({ min: 5 })
        .withMessage("Hospital address must be at least 5 characters."),

    /* ===============================
       HOSPITAL STATUS
    =============================== */

    body("status")
        .notEmpty()
        .withMessage("Hospital status is required.")
        .isIn(["active", "inactive"])
        .withMessage("Invalid hospital status.")

];