exports.checkPermission = (permission) => {
    return (req, res, next) => {
        try {

            // 1. check login session
            if (!req.session.hospitalAdmin) {
                return res.send("Unauthorized: Please login first");
            }

            const admin = req.session.hospitalAdmin;

            // 2. get permissions
            const permissions = admin.permissions || [];

            // 3. check permission
            if (!permissions.includes(permission)) {
                return res.send("Access Denied: You do not have permission");
            }

            next();

        } catch (error) {
            console.log("RBAC Error:", error);
            res.send("Server Error in RBAC");
        }
    };
};