const HospitalAdmin = require("../models/HospitalAdmin");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

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

        const token = generateToken(user);

        res.cookie("token", token, {

            httpOnly: true,

            secure: false,

            maxAge: 24 * 60 * 60 * 1000

        });

        return res.redirect("/platform/dashboard");

    }

    res.send("Invalid Platform Admin Credentials");

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

        const { email, password } = req.body;

        const admin = await HospitalAdmin
            .findOne({ email })
            .populate("hospital");

        if (!admin) {

            return res.send("Invalid Email or Password");

        }

        const match = await bcrypt.compare(

            password,

            admin.password

        );

        if (!match) {

            return res.send("Invalid Email or Password");

        }

        const user = {

            id: admin._id,

            role: "hospital_admin",

            hospital: admin.hospital._id,

            hospitalName: admin.hospital.name,

            name: admin.name,

            permissions: admin.permissions || []

        };

        /* ===========================
           Existing Session
        =========================== */

        req.session.user = user;

        /* ===========================
           JWT Token
        =========================== */

        const token = generateToken(user);

        res.cookie("token", token, {

            httpOnly: true,

            secure: false,

            maxAge: 24 * 60 * 60 * 1000

        });

        res.redirect("/hospital/dashboard");

    }

    catch (err) {

        console.log(err);

        res.send("Login Error");

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

        res.redirect("/hospital/login");

    });

};