/*
=====================================================
AUTH CONTROLLER
Hospital RBAC System

Web Authentication
(Session +JWT Hybrid)
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

        req.session.user = user;

        const token = jwt.sign(

            user,

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.cookie("token", token, {

            httpOnly: true,

            secure: false,

            maxAge: 24 * 60 * 60 * 1000

        });

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

                email: email.trim().toLowerCase()

            })

            .populate("hospital");

        if (!admin) {

            return res.send("Invalid Email or Password");

        }

        const matched = await bcrypt.compare(

            password,

            admin.password

        );

        if (!matched) {

            return res.send("Invalid Email or Password");

        }

        const user = {

            id: admin._id,

            role: "hospital_admin",

            hospital: admin.hospital._id,

            hospitalName: admin.hospital.name,

            name: admin.name,

            permissions: admin.permissions || [],

            mustChangePassword: admin.mustChangePassword

        };

        /* ==========================================
           SAVE SESSION
        ========================================== */

        req.session.user = user;

        /* ==========================================
           CREATE JWT
        ========================================== */

        const token = jwt.sign(

            user,

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.cookie("token", token, {

            httpOnly: true,

            secure: false,

            maxAge: 24 * 60 * 60 * 1000

        });

        /* ==========================================
           FIRST LOGIN
        ========================================== */

        if (admin.mustChangePassword) {

            return res.redirect("/hospital/change-password");

        }

        return res.redirect("/hospital/dashboard");

    }

    catch (error) {

        console.log(error);

        return res.send("Login Error");

    }

};

/* =====================================================
   CHANGE PASSWORD PAGE
===================================================== */

exports.changePasswordPage = (req, res) => {

    if (!req.session.user) {

        return res.redirect("/hospital/login");

    }

    res.render("hospital/change-password");

};

/* =====================================================
   CHANGE PASSWORD
===================================================== */

exports.changePassword = async (req, res) => {

    try {

        if (!req.session.user) {

            return res.redirect("/hospital/login");

        }

        const {

            currentPassword,

            newPassword,

            confirmPassword

        } = req.body;

        if (newPassword !== confirmPassword) {

            return res.send(

                "New Password and Confirm Password do not match."

            );

        }

        const admin = await HospitalAdmin.findById(

            req.session.user.id

        );

        if (!admin) {

            return res.send("Hospital Admin not found.");

        }

        const matched = await bcrypt.compare(

            currentPassword,

            admin.password

        );

        if (!matched) {

            return res.send("Current Password is incorrect.");

        }

        admin.password = await bcrypt.hash(

            newPassword,

            10

        );

        admin.mustChangePassword = false;

        await admin.save();

        /* ==========================================
           UPDATE SESSION
        ========================================== */

        req.session.user.mustChangePassword = false;

        /* ==========================================
           UPDATE JWT
        ========================================== */

        const updatedUser = {

            id: admin._id,

            role: "hospital_admin",

            hospital: admin.hospital,

            name: admin.name,

            permissions: admin.permissions || [],

            mustChangePassword: false

        };

        const token = jwt.sign(

            updatedUser,

            process.env.JWT_SECRET,

            {

                expiresIn: "1d"

            }

        );

        res.cookie("token", token, {

            httpOnly: true,

            secure: false,

            maxAge: 24 * 60 * 60 * 1000

        });

        return res.redirect("/hospital/dashboard");

    }

    catch (error) {

        console.log(error);

        return res.send("Unable to change password.");

    }

};

/* =====================================================
   LOGOUT
===================================================== */

exports.logout = (req, res) => {

    res.clearCookie("token");

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.send("Logout Failed");

        }

        return res.redirect("/hospital/login");

    });

};