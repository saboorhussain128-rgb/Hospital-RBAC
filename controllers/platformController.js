const Hospital = require("../models/Hospital");
const HospitalAdmin = require("../models/HospitalAdmin");

/* -------------------------
   LOGIN PAGE
--------------------------*/
exports.loginPage = (req, res) => {
    res.render("platform/login");
};

/* -------------------------
   LOGIN (PLATFORM ADMIN)
--------------------------*/
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Simple hardcoded admin (you can move to DB later)
    if (email === "admin@gmail.com" && password === "admin123") {

        req.session.user = {
            role: "platform_admin"
        };

        return res.redirect("/platform/dashboard");
    }

    res.send("Invalid Platform Admin Credentials");
};

/* -------------------------
   DASHBOARD
--------------------------*/
exports.dashboard = async (req, res) => {
    try {
        const hospitalCount = await Hospital.countDocuments();
        const adminCount = await HospitalAdmin.countDocuments();

        res.render("platform/dashboard", {
            hospitalCount,
            adminCount
        });

    } catch (error) {
        console.log(error);
        res.send("Dashboard Error");
    }
};

/* -------------------------
   LOGOUT
--------------------------*/
exports.logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.log(err);
            return res.send("Logout Failed");
        }

        res.redirect("/platform/login");

    });

};