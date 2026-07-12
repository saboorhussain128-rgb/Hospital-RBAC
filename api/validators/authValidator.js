/*
==================================================
AUTH API VALIDATORS
Hospital RBAC System
==================================================
*/

const { body } = require("express-validator");

/* ==================================================
   COMMON PASSWORD RULES
================================================== */

const passwordRules = body("password")

    .trim()

    .notEmpty()

    .withMessage("Password is required.")

    .isLength({ min: 8 })

    .withMessage("Password must be at least 8 characters.")

    .matches(/[A-Z]/)

    .withMessage("Password must contain at least one uppercase letter.")

    .matches(/[a-z]/)

    .withMessage("Password must contain at least one lowercase letter.")

    .matches(/[0-9]/)

    .withMessage("Password must contain at least one number.")

    .matches(/[!@#$%^&*(),.?":{}|<>]/)

    .withMessage("Password must contain at least one special character.");

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

/* ==================================================
   FORGOT PASSWORD VALIDATION
================================================== */

exports.forgotPasswordValidation = [

    body("email")

        .trim()

        .notEmpty()

        .withMessage("Email is required.")

        .isEmail()

        .withMessage("Please enter a valid email.")

        .normalizeEmail()

];

/* ==================================================
   RESET PASSWORD VALIDATION
================================================== */

exports.resetPasswordValidation = [

    body("token")

        .trim()

        .notEmpty()

        .withMessage("Reset token is required."),

    passwordRules

];

/* ==================================================
   CHANGE PASSWORD VALIDATION
================================================== */

exports.changePasswordValidation = [

    body("currentPassword")

        .notEmpty()

        .withMessage("Current password is required."),

    body("newPassword")

        .notEmpty()

        .withMessage("New password is required.")

        .isLength({ min: 8 })

        .withMessage("Password must be at least 8 characters.")

        .matches(/[A-Z]/)

        .withMessage("Password must contain at least one uppercase letter.")

        .matches(/[a-z]/)

        .withMessage("Password must contain at least one lowercase letter.")

        .matches(/[0-9]/)

        .withMessage("Password must contain at least one number.")

        .matches(/[!@#$%^&*(),.?":{}|<>]/)

        .withMessage("Password must contain at least one special character."),

    body("confirmPassword")

        .notEmpty()

        .withMessage("Confirm password is required.")

];

/* ==================================================
   SEND OTP VALIDATION
================================================== */

exports.sendOTPValidation = [

    body("email")

        .trim()

        .notEmpty()

        .withMessage("Email is required.")

        .isEmail()

        .withMessage("Please enter a valid email.")

        .normalizeEmail()

];

/* ==================================================
   VERIFY OTP VALIDATION
================================================== */

exports.verifyOTPValidation = [

    body("email")

        .trim()

        .notEmpty()

        .withMessage("Email is required.")

        .isEmail()

        .withMessage("Please enter a valid email.")

        .normalizeEmail(),

    body("otp")

        .trim()

        .notEmpty()

        .withMessage("OTP is required.")

        .isLength({ min: 6, max: 6 })

        .withMessage("OTP must be 6 digits.")

];