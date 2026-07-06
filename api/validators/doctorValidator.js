const { body } = require("express-validator");

/* =====================================================
   CREATE DOCTOR VALIDATION
===================================================== */

exports.createDoctorValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Doctor name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Doctor name must be between 3 and 50 characters."),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Doctor email is required.")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail()

];

/* =====================================================
   UPDATE DOCTOR VALIDATION
===================================================== */

exports.updateDoctorValidation = [

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Doctor name must be between 3 and 50 characters."),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail()

];