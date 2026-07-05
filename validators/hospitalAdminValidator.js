const { body } = require("express-validator");

/* =====================================================
   CREATE HOSPITAL ADMIN VALIDATION
===================================================== */

exports.createHospitalAdminValidation = [

    /* ===============================
       NAME
    =============================== */

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Hospital Admin name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters."),

    /* ===============================
       EMAIL
    =============================== */

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email address.")
        .normalizeEmail(),

    /* ===============================
       PASSWORD
    =============================== */

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number."),

    /* ===============================
       HOSPITAL
    =============================== */

    body("hospital")
        .notEmpty()
        .withMessage("Please select a hospital."),

    /* ===============================
       PERMISSIONS
    =============================== */

    body("permissions")
        .custom((value) => {

            if (!value || (Array.isArray(value) && value.length === 0)) {

                throw new Error("Please assign at least one permission.");

            }

            return true;

        })

];