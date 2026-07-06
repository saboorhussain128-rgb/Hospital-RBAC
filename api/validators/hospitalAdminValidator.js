const { body } = require("express-validator");

/* =====================================================
   CREATE HOSPITAL ADMIN
===================================================== */

exports.createHospitalAdminValidation = [

    body("hospital")
        .notEmpty()
        .withMessage("Hospital is required."),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters required."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required.")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters."),

    body("permissions")
        .isArray({ min: 1 })
        .withMessage("Select at least one permission.")

];

/* =====================================================
   UPDATE HOSPITAL ADMIN
===================================================== */

exports.updateHospitalAdminValidation = [

    body("hospital")
        .notEmpty()
        .withMessage("Hospital is required."),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required."),

    body("permissions")
        .isArray({ min: 1 })
        .withMessage("Permissions are required.")

];