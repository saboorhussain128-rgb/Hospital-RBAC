const HospitalAdmin = require("../models/HospitalAdmin");
const bcrypt = require("bcryptjs");

/* -------------------------
   PLATFORM LOGIN PAGE
--------------------------*/
exports.platformLoginPage = (req, res) => {
    res.render("platform/login");
};

/* -------------------------
   PLATFORM LOGIN
--------------------------*/
exports.platformLogin = (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "admin123") {

        req.session.user = {
            role: "platform_admin"
        };

        return res.redirect("/platform/dashboard");
    }

    res.send("Invalid credentials");
};

/* -------------------------
   HOSPITAL LOGIN PAGE
--------------------------*/
exports.hospitalLoginPage = (req, res) => {
    res.render("hospital/login");
};

/* -------------------------
   HOSPITAL LOGIN (SECURE)
--------------------------*/
exports.hospitalLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await HospitalAdmin.findOne({ email });

        if (!admin) {
            return res.send("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.send("Invalid credentials");
        }

        req.session.user = {
            id: admin._id,
            role: "hospital_admin",
            hospital: admin.hospital
        };

        res.redirect("/hospital/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Login error");
    }
};

/* -------------------------
   LOGOUT
--------------------------*/
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Logout Error:", err);
            return res.send("Error logging out");
        }

        res.redirect("/hospital/login");
    });
};