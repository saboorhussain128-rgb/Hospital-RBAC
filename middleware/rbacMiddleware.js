exports.checkPermission = (permission) => {

    return (req, res, next) => {

        if (!req.session.user) {
            return res.redirect("/hospital/login");
        }

        const permissions = req.session.user.permissions || [];

        if (!permissions.includes(permission)) {
            return res.send("Access Denied");
        }

        next();

    };

};