const { body } = require("express-validator");

/* =====================================================
   CREATE HOSPITAL ADMIN VALIDATION
===================================================== */

exports.createHospitalAdminValidation = [

    /* =================================================
       NAME
    ================================================= */

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required.")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters."),

    /* =================================================
       EMAIL
    ================================================= */

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    /* =================================================
       PASSWORD
    ================================================= */

    body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number."),

    /* =================================================
       HOSPITAL
    ================================================= */

    body("hospital")
        .trim()
        .notEmpty()
        .withMessage("Hospital ID is required."),

    /* =================================================
       PERMISSIONS
    ================================================= */

    body("permissions")
        .custom((value) => {

            if (!value) {

                throw new Error("Permissions are required.");

            }

            if (Array.isArray(value) && value.length === 0) {

                throw new Error("Please assign at least one permission.");

            }

            return true;

        })

];

/* =====================================================
   UPDATE HOSPITAL ADMIN VALIDATION
===================================================== */

exports.updateHospitalAdminValidation = [

    /* =================================================
       NAME
    ================================================= */

    body("name")
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Name must be between 3 and 50 characters."),

    /* =================================================
       EMAIL
    ================================================= */

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),

    /* =================================================
       PASSWORD
    ================================================= */

    body("password")
        .optional({ checkFalsy: true })
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters.")
        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter.")
        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number."),

    /* =================================================
       HOSPITAL
    ================================================= */

    body("hospital")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Hospital ID cannot be empty."),

    /* =================================================
       PERMISSIONS
    ================================================= */

    body("permissions")
        .optional()
        .custom((value) => {

            if (Array.isArray(value) && value.length === 0) {

                throw new Error("Please assign at least one permission.");

            }

            return true;

        })

];