/*
==================================================
API RBAC PERMISSION MIDDLEWARE
Hospital RBAC System
==================================================
*/

module.exports = (...requiredPermissions) => {

    return (req, res, next) => {

        try {

            /* ==========================================
               PLATFORM ADMIN
            ========================================== */

            if (
                req.user &&
                req.user.role === "platform_admin"
            ) {

                return next();

            }

            /* ==========================================
               LOGIN CHECK
            ========================================== */

            if (!req.user) {

                return res.status(401).json({

                    success: false,

                    message: "Unauthorized."

                });

            }

            /* ==========================================
               USER PERMISSIONS
            ========================================== */

            const permissions = req.user.permissions || [];

            const allowed = requiredPermissions.every(

                permission => permissions.includes(permission)

            );

            if (!allowed) {

                return res.status(403).json({

                    success: false,

                    message: "Permission Denied."

                });

            }

            next();

        }

        catch (error) {

            console.log(error);

            return res.status(500).json({

                success: false,

                message: "Permission Check Failed."

            });

        }

    };

};