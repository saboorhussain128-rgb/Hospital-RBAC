exports.checkPermission = (permission) => {

    return (req, res, next) => {

        /* =====================================================
           GET USER (SESSION OR JWT)
        ===================================================== */

        const user = req.session.user || req.user;

        if (!user) {
            return res.redirect("/hospital/login");
        }

        const permissions = user.permissions || [];

        /* =====================================================
           CHECK PERMISSION
        ===================================================== */

        if (!permissions.includes(permission)) {
            return res.send("Access Denied");
        }

        next();
    };
};