/*
==================================================
API RBAC Middleware
Hospital RBAC System
==================================================
*/

/* ==================================================
   AUTHORIZE USER
================================================== */

exports.authorize = (requiredRoleOrPermission) => {

    return (req, res, next) => {

        const user = req.user;

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized."

            });

        }

        /* ==========================================
           PLATFORM ADMIN
        ========================================== */

        if (requiredRoleOrPermission === "platform_admin") {

            if (user.role !== "platform_admin") {

                return res.status(403).json({

                    success: false,

                    message: "Access Denied."

                });

            }

            return next();

        }

        /* ==========================================
           HOSPITAL ADMIN PERMISSIONS
        ========================================== */

        if (user.role === "platform_admin") {

            return next();

        }

        if (
            user.permissions &&
            user.permissions.includes(requiredRoleOrPermission)
        ) {

            return next();

        }

        return res.status(403).json({

            success: false,

            message: "Permission Denied."

        });

    };

};