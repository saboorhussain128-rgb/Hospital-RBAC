const { body } = require("express-validator");

/* =====================================================
   CREATE DOCTOR VALIDATION
===================================================== */

exports.createDoctorValidation = [

    /* ===============================
       DOCTOR NAME
    =============================== */

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Doctor name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Doctor name must be between 3 and 50 characters."),

    /* ===============================
       EMAIL
    =============================== */

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Doctor email is required.")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail()

];