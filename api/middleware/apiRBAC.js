/*
==================================================
API RBAC Middleware
==================================================
*/

/* ==================================================
   CHECK PERMISSION
================================================== */

exports.checkPermission = (permission) => {

    return (req, res, next) => {

        const user = req.user;

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized."

            });

        }

        if (user.role === "platform_admin") {

            return next();

        }

        if (

            user.permissions &&

            user.permissions.includes(permission)

        ) {

            return next();

        }

        return res.status(403).json({

            success: false,

            message: "Permission Denied."

        });

    };

};