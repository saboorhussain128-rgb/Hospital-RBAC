module.exports = {

    // Check if user is logged in
    isAuthenticated: (req, res, next) => {
        if (req.session.user) {
            return next();
        }
        return res.redirect("/platform/login");
    },

    // Only Platform Admin
    isPlatformAdmin: (req, res, next) => {
        if (req.session.user && req.session.user.role === "platform_admin") {
            return next();
        }
        return res.send("Access Denied: Platform Admins Only");
    },

    // Only Hospital Admin
    isHospitalAdmin: (req, res, next) => {
        if (req.session.user && req.session.user.role === "hospital_admin") {
            return next();
        }
        return res.send("Access Denied: Hospital Admins Only");
    }
};