const { verifyToken } = require("../utils/jwt");

/* =====================================================
   AUTHENTICATION
===================================================== */

exports.isAuthenticated = (req, res, next) => {

    /* ==========================================
       SESSION LOGIN
    ========================================== */

    if (req.session && req.session.user) {

        req.user = req.session.user;

        return next();

    }

    /* ==========================================
       JWT LOGIN
    ========================================== */

    const token = req.cookies.token;

    if (!token) {

        return res.redirect("/hospital/login");

    }

    try {

        const decoded = verifyToken(token);

        req.user = decoded;

        return next();

    } catch (error) {

        res.clearCookie("token");

        return res.redirect("/hospital/login");

    }

};

/* =====================================================
   PLATFORM ADMIN
===================================================== */

exports.isPlatformAdmin = (req, res, next) => {

    const user = req.user || req.session.user;

    if (!user) {

        return res.redirect("/platform/login");

    }

    if (user.role !== "platform_admin") {

        return res.send("Access Denied");

    }

    next();

};

/* =====================================================
   HOSPITAL ADMIN
===================================================== */

exports.isHospitalAdmin = (req, res, next) => {

    const user = req.user || req.session.user;

    if (!user) {

        return res.redirect("/hospital/login");

    }

    if (user.role !== "hospital_admin") {

        return res.send("Access Denied");

    }

    next();

};