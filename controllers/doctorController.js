const Doctor = require("../models/Doctor");

/* =====================================================
   CREATE DOCTOR PAGE
===================================================== */

exports.createPage = async (req, res) => {

    try {

        res.render("hospital/createDoctor", {
            admin: req.session.user
        });

    } catch (error) {

        console.log("Create Doctor Page Error:", error);

        res.send("Error loading Create Doctor page.");

    }

};

/* =====================================================
   CREATE DOCTOR
===================================================== */

exports.createDoctor = async (req, res) => {

    try {

        const { name, email } = req.body;

        const hospitalId = req.session.user.hospital._id;

        await Doctor.create({

            hospital: hospitalId,

            name,

            email

        });

        res.redirect("/hospital/view-doctor");

    } catch (error) {

        console.log("Create Doctor Error:", error);

        res.send("Error creating doctor.");

    }

};

/* =====================================================
   VIEW DOCTORS
===================================================== */

exports.viewDoctors = async (req, res) => {

    try {

        const hospitalId = req.session.user.hospital._id;

        const doctors = await Doctor.find({

            hospital: hospitalId

        }).sort({

            createdAt: -1

        });

        res.render("hospital/viewDoctor", {

            doctors

        });

    } catch (error) {

        console.log("View Doctors Error:", error);

        res.send("Error fetching doctors.");

    }

};

/* =====================================================
   DELETE DOCTOR PAGE
===================================================== */

exports.deleteDoctorPage = async (req, res) => {

    try {

        const hospitalId = req.session.user.hospital._id;

        const doctors = await Doctor.find({

            hospital: hospitalId

        }).sort({

            createdAt: -1

        });

        res.render("hospital/deleteDoctor", {

            doctors

        });

    } catch (error) {

        console.log("Delete Doctor Page Error:", error);

        res.send("Error loading delete doctor page.");

    }

};

/* =====================================================
   DELETE DOCTOR
===================================================== */

exports.deleteDoctor = async (req, res) => {

    try {

        await Doctor.findByIdAndDelete(req.params.id);

        res.redirect("/hospital/delete-doctor");

    } catch (error) {

        console.log("Delete Doctor Error:", error);

        res.send("Error deleting doctor.");

    }

};