/*
==================================================
FORCE PASSWORD CHANGE MIDDLEWARE
Hospital RBAC System
==================================================
*/

exports.forcePasswordChange = (req, res, next) => {

    /* ==========================================
       USER NOT LOGGED IN
    ========================================== */

    if (!req.session.user) {

        return res.redirect("/hospital/login");

    }

    /* ==========================================
       PLATFORM ADMIN
    ========================================== */

    if (req.session.user.role === "platform_admin") {

        return next();

    }

    /* ==========================================
       HOSPITAL ADMIN
    ========================================== */

    if (

        req.session.user.role === "hospital_admin" &&

        req.session.user.mustChangePassword

    ) {

        return res.redirect(

            "/hospital/change-password"

        );

    }

    next();

};