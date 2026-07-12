/*
=====================================================
AUTH CONTROLLER
Hospital RBAC System

Web Authentication
(Session + JWT Hybrid)
=====================================================
*/

const HospitalAdmin = require("../models/HospitalAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =====================================================
   PLATFORM LOGIN PAGE
===================================================== */

exports.platformLoginPage = (req, res) => {

    res.render("platform/login");

};

/* =====================================================
   PLATFORM LOGIN
===================================================== */

exports.platformLogin = (req, res) => {

    const { email, password } = req.body;

    if (

        email === "admin@gmail.com" &&
        password === "admin123"

    ) {

        const user = {

            id: "platform_admin",

            role: "platform_admin",

            name: "Platform Admin",

            permissions: []

        };

        /* ==========================================
           SESSION
        ========================================== */

        req.session.user = user;

        /* ==========================================
           JWT
        ========================================== */

        const token = jwt.sign(

            user,

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.cookie(

            "token",

            token,

            {

                httpOnly: true,

                secure: false,

                maxAge: 24 * 60 * 60 * 1000

            }

        );

        return res.redirect("/platform/dashboard");

    }

    return res.send("Invalid Platform Admin Credentials");

};

/* =====================================================
   HOSPITAL LOGIN PAGE
===================================================== */

exports.hospitalLoginPage = (req, res) => {

    res.render("hospital/login");

};

/* =====================================================
   HOSPITAL LOGIN
===================================================== */

exports.hospitalLogin = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        const admin = await HospitalAdmin

            .findOne({

                email

            })

            .populate("hospital");

        if (!admin) {

            return res.send(

                "Invalid Email or Password"

            );

        }

        const matched = await bcrypt.compare(

            password,

            admin.password

        );

        if (!matched) {

            return res.send(

                "Invalid Email or Password"

            );

        }

        /* ==========================================
           SESSION USER
        ========================================== */

        const user = {

            id: admin._id,

            role: "hospital_admin",

            hospital: admin.hospital._id,

            hospitalName: admin.hospital.name,

            name: admin.name,

            permissions: admin.permissions || [],

            mustChangePassword: admin.mustChangePassword

        };

        req.session.user = user;

        /* ==========================================
           JWT
        ========================================== */

        const token = jwt.sign(

            user,

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.cookie(

            "token",

            token,

            {

                httpOnly: true,

                secure: false,

                maxAge: 24 * 60 * 60 * 1000

            }

        );

        /* ==========================================
           FIRST LOGIN CHECK
        ========================================== */

        if (admin.mustChangePassword) {

            return res.redirect(

                "/hospital/change-password"

            );

        }

        /* ==========================================
           NORMAL LOGIN
        ========================================== */

        return res.redirect(

            "/hospital/dashboard"

        );

    }

    catch (error) {

        console.log(error);

        return res.send(

            "Login Error"

        );

    }

};

/* =====================================================
   CHANGE PASSWORD PAGE
===================================================== */

exports.changePasswordPage = (req, res) => {

    res.render(

        "hospital/change-password"

    );

};

/* =====================================================
   LOGOUT
===================================================== */

exports.logout = (req, res) => {

    res.clearCookie("token");

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.send(

                "Logout Failed"

            );

        }

        return res.redirect(

            "/hospital/login"

        );

    });

};