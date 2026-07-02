const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");

/* -------------------------
   CREATE DOCTOR PAGE
--------------------------*/
exports.createPage = async (req, res) => {
    try {
        const hospitalId = req.session.user.hospital;

        res.render("hospital/createDoctor", {
            hospitalId
        });

    } catch (error) {
        console.log(error);
        res.send("Error loading create doctor page");
    }
};

/* -------------------------
   CREATE DOCTOR
--------------------------*/
exports.createDoctor = async (req, res) => {
    try {
        const hospitalId = req.session.user.hospital;
        const { name, email } = req.body;

        await Doctor.create({
            hospital: hospitalId,
            name,
            email
        });

        res.redirect("/hospital/view-doctor");

    } catch (error) {
        console.log(error);
        res.send("Error creating doctor");
    }
};

/* -------------------------
   VIEW DOCTORS (FILTER BY HOSPITAL)
--------------------------*/
exports.viewDoctors = async (req, res) => {
    try {
        const hospitalId = req.session.user.hospital;

        const doctors = await Doctor.find({ hospital: hospitalId });

        res.render("hospital/viewDoctor", {
            doctors
        });

    } catch (error) {
        console.log(error);
        res.send("Error fetching doctors");
    }
};

/* -------------------------
   DELETE DOCTOR
--------------------------*/
exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        await Doctor.findByIdAndDelete(id);

        res.redirect("/hospital/view-doctor");

    } catch (error) {
        console.log(error);
        res.send("Error deleting doctor");
    }
};