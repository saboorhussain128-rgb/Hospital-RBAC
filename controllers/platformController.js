/*
==================================================
PLATFORM CONTROLLER
Hospital RBAC System
==================================================
*/

const Hospital = require("../models/Hospital");
const HospitalAdmin = require("../models/HospitalAdmin");
const AuditLog = require("../models/AuditLog");

/* ==================================================
   LOGIN PAGE
================================================== */

exports.loginPage = (req, res) => {

    res.render("platform/login");

};

/* ==================================================
   LOGIN
================================================== */

exports.login = (req, res) => {

    const { email, password } = req.body;

    if (

        email === "admin@gmail.com" &&
        password === "admin123"

    ) {

        req.session.user = {

            id: "platform_admin",

            name: "Platform Admin",

            role: "platform_admin"

        };

        return res.redirect("/platform/dashboard");

    }

    return res.send("Invalid Platform Admin Credentials");

};

/* ==================================================
   DASHBOARD
================================================== */

exports.dashboard = async (req, res) => {

    try {

        const Hospital = require("../models/Hospital");
        const HospitalAdmin = require("../models/HospitalAdmin");
        const Doctor = require("../models/Doctor");
        const AuditLog = require("../models/AuditLog");

        const hospitalCount = await Hospital.countDocuments();

        const adminCount = await HospitalAdmin.countDocuments();

        const doctorCount = await Doctor.countDocuments();

        const auditCount = await AuditLog.countDocuments();

        res.render("platform/dashboard", {

            hospitalCount,

            adminCount,

            doctorCount,

            auditCount

        });

    }

    catch (error) {

        console.log(error);

        res.send("Dashboard Error");

    }

};

/* ==================================================
   VIEW AUDIT LOGS
================================================== */

exports.viewAuditLogs = async (req, res) => {

    try {

        const logs = await AuditLog.find()

            .sort({

                createdAt: -1

            });

        res.render("platform/viewAuditLogs", {

            logs

        });

    }

    catch (error) {

        console.log(error);

        res.send("Unable to load Audit Logs.");

    }

};

/* ==================================================
   LOGOUT
================================================== */

exports.logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.send("Logout Failed");

        }

        res.redirect("/platform/login");

    });

};