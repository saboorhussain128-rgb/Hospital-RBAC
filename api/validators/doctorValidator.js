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
        .normalizeEmail(),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required."),

    body("gender")
        .isIn(["Male", "Female", "Other"])
        .withMessage("Invalid gender."),

    body("dateOfBirth")
        .notEmpty()
        .withMessage("Date of Birth is required.")
        .isISO8601()
        .withMessage("Invalid date."),

    body("qualification")
        .trim()
        .notEmpty()
        .withMessage("Qualification is required."),

    body("specialization")
        .trim()
        .notEmpty()
        .withMessage("Specialization is required."),

    body("experience")
        .isInt({ min: 0 })
        .withMessage("Experience must be a positive number."),

    body("consultationFee")
        .isFloat({ min: 0 })
        .withMessage("Consultation Fee must be a positive number."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required."),

    body("status")
        .optional()
        .isIn(["active", "inactive"])
        .withMessage("Invalid status.")

];

/* =====================================================
   UPDATE DOCTOR VALIDATION
===================================================== */

exports.updateDoctorValidation = [

    body("name").optional().trim(),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email.")
        .normalizeEmail(),

    body("phone").optional(),

    body("gender")
        .optional()
        .isIn(["Male", "Female", "Other"]),

    body("dateOfBirth")
        .optional()
        .isISO8601(),

    body("qualification").optional(),

    body("specialization").optional(),

    body("experience")
        .optional()
        .isInt({ min: 0 }),

    body("consultationFee")
        .optional()
        .isFloat({ min: 0 }),

    body("address").optional(),

    body("status")
        .optional()
        .isIn(["active", "inactive"])

];