const bcrypt = require("bcryptjs");
const PlatformAdmin = require("../models/PlatformAdmin");

// LOGIN PAGE
exports.loginPage = (req, res) => {
    res.render("platform/login");
};

// LOGIN POST
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find admin
        const admin = await PlatformAdmin.findOne({ email });

        if (!admin) {
            return res.send("Invalid Email or Password");
        }

        // check password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.send("Invalid Email or Password");
        }

        // session create
        req.session.admin = {
            id: admin._id,
            email: admin.email
        };

        res.redirect("/platform/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
};

// DASHBOARD
exports.dashboard = (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/platform/login");
    }

    res.render("platform/dashboard");
};

// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/platform/login");
    });
};