const Hospital = require("../models/Hospital");
const HospitalAdmin = require("../models/HospitalAdmin");
const bcrypt = require("bcryptjs");

/* -------------------------
   LOGIN PAGE
--------------------------*/
exports.loginPage = (req, res) => {
    res.render("hospital/login");
};

/* -------------------------
   LOGIN (FIXED RBAC SAFE)
--------------------------*/
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await HospitalAdmin.findOne({ email });

        if (!admin) {
            return res.send("Invalid Hospital Admin Credentials");
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.send("Invalid Hospital Admin Credentials");
        }

        // ✅ FIX: always ensure permissions array exists
        req.session.hospitalAdmin = {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            hospital: admin.hospital,
            permissions: admin.permissions || []
        };

        return res.redirect("/hospital/dashboard");

    } catch (error) {
        console.log(error);
        return res.send("Login Failed");
    }
};

/* -------------------------
   DASHBOARD
--------------------------*/
exports.dashboard = (req, res) => {
    res.render("hospital/dashboard", {
        admin: req.session.hospitalAdmin
    });
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