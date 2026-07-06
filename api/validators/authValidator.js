/*
==================================================
API Authentication Validator
==================================================
*/

const { body } = require("express-validator");

/* ==================================================
   LOGIN VALIDATION
================================================== */

exports.loginValidation = [

    body("email")

        .trim()

        .notEmpty()

        .withMessage("Email is required.")

        .isEmail()

        .withMessage("Please enter a valid email.")

        .normalizeEmail(),

    body("password")

        .notEmpty()

        .withMessage("Password is required.")

];