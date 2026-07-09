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
IMPORT VALIDATION RESULT HANDLER
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

    authController.platformAdminLogin

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

    authController.hospitalAdminLogin

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

    authController.getProfile

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

    authController.logout

);



/*
==================================================
EXPORT ROUTER
==================================================
*/

module.exports = router;