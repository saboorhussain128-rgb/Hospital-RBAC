/*
==================================================
AUTH API ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");

const router = express.Router();

/*
==================================================
IMPORT CONTROLLER
==================================================
*/

const authController = require("../controllers/authController");

/*
==================================================
IMPORT VALIDATORS
==================================================
*/

const {

    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation

} = require("../validators/authValidator");

/*
==================================================
IMPORT AUTH MIDDLEWARE
==================================================
*/

const {

    authenticate

} = require("../middleware/apiAuth");

/*
==================================================
IMPORT VALIDATION RESULT
==================================================
*/

const { validationResult } = require("express-validator");

/*
==================================================
VALIDATION MIDDLEWARE
==================================================
*/

const validateRequest = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            message: "Validation Failed",

            errors: errors.array()

        });

    }

    next();

};

/*
==================================================
PLATFORM ADMIN LOGIN

POST
/api/auth/platform-login
==================================================
*/

router.post(

    "/platform-login",

    loginValidation,

    validateRequest,

    authController.platformLogin

);

/*
==================================================
HOSPITAL ADMIN LOGIN

POST
/api/auth/hospital-login
==================================================
*/

router.post(

    "/hospital-login",

    loginValidation,

    validateRequest,

    authController.hospitalLogin

);

/*
==================================================
CURRENT USER PROFILE

GET
/api/auth/profile
==================================================
*/

router.get(

    "/profile",

    authenticate,

    authController.profile

);

/*
==================================================
FORGOT PASSWORD

POST
/api/auth/forgot-password
==================================================
*/

router.post(

    "/forgot-password",

    forgotPasswordValidation,

    validateRequest,

    authController.forgotPassword

);

/*
==================================================
RESET PASSWORD

POST
/api/auth/reset-password
==================================================
*/

router.post(

    "/reset-password",

    resetPasswordValidation,

    validateRequest,

    authController.resetPassword

);

/*
==================================================
LOGOUT

POST
/api/auth/logout
==================================================
*/

router.post(

    "/logout",

    authenticate,

    authController.logout

);

/*
==================================================
EXPORT ROUTER
==================================================
*/

module.exports = router;