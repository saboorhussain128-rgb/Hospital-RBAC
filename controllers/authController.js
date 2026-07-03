const HospitalAdmin = require("../models/HospitalAdmin");
const bcrypt = require("bcryptjs");

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

        req.session.user = {

            role: "platform_admin"

        };

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

        req.session.user = {

            id: admin._id,

            role: "hospital_admin",

            hospital: admin.hospital._id,

            hospitalName: admin.hospital.name,

            name: admin.name,

            permissions: admin.permissions || []

        };

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

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.send("Logout Failed");

        }

        res.redirect("/hospital/login");

    });

};