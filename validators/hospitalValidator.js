const { body } = require("express-validator");

/* =====================================================
   CREATE HOSPITAL VALIDATION
===================================================== */

exports.createHospitalValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Hospital name is required.")
        .isLength({ min: 3 })
        .withMessage("Hospital name must be at least 3 characters."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Hospital address is required.")
        .isLength({ min: 5 })
        .withMessage("Hospital address must be at least 5 characters."),

    body("status")
        .notEmpty()
        .withMessage("Hospital status is required.")
        .isIn(["active", "inactive"])
        .withMessage("Invalid hospital status.")

];