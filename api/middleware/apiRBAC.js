/*
==================================================
API RBAC MIDDLEWARE
Hospital RBAC System
==================================================
*/

/* ==================================================
   PLATFORM ADMIN ONLY
================================================== */

exports.platformAdminOnly = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({

            success: false,

            message: "Unauthorized."

        });

    }

    if (req.user.role !== "platform_admin") {

        return res.status(403).json({

            success: false,

            message: "Platform Admin access required."

        });

    }

    next();

};

/* ==================================================
   HOSPITAL ADMIN ONLY
================================================== */

exports.hospitalAdminOnly = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({

            success: false,

            message: "Unauthorized."

        });

    }

    if (req.user.role !== "hospital_admin") {

        return res.status(403).json({

            success: false,

            message: "Hospital Admin access required."

        });

    }

    next();

};

/* ==================================================
   CHECK PERMISSION
================================================== */

exports.checkPermission = (permission) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized."

            });

        }

        const permissions = req.user.permissions || [];

        if (!permissions.includes(permission)) {

            return res.status(403).json({

                success: false,

                message: "Permission denied."

            });

        }

        next();

    };

};