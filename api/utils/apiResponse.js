/*
==================================================
API RESPONSE HELPER
Hospital RBAC System
==================================================
*/

/* ==================================================
   SUCCESS RESPONSE
================================================== */

exports.success = (

    res,

    message = "Success",

    data = null,

    statusCode = 200

) => {

    return res.status(statusCode).json({

        success: true,

        message,

        data

    });

};

/* ==================================================
   ERROR RESPONSE
================================================== */

exports.error = (

    res,

    message = "Something went wrong",

    statusCode = 500,

    errors = null

) => {

    return res.status(statusCode).json({

        success: false,

        message,

        errors

    });

};