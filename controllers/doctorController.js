const Doctor = require("../models/Doctor");

/* =====================================================
   CREATE DOCTOR PAGE
===================================================== */

exports.createPage = (req, res) => {

    res.render("hospital/createDoctor");

};

/* =====================================================
   CREATE DOCTOR
===================================================== */

exports.createDoctor = async (req, res) => {

    try {

        const hospitalAdmin = req.session.user;

        if (!hospitalAdmin) {
            return res.redirect("/hospital/login");
        }

        const { name, email } = req.body;

        await Doctor.create({

            hospital: hospitalAdmin.hospital,

            name,

            email

        });

        res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log("CREATE DOCTOR ERROR");
        console.log(error);

        res.send("Error creating doctor");

    }

};

/* =====================================================
   VIEW DOCTORS
===================================================== */

exports.viewDoctors = async (req, res) => {

    try {

        const hospitalAdmin = req.session.user;

        if (!hospitalAdmin) {
            return res.redirect("/hospital/login");
        }

        const doctors = await Doctor.find({

            hospital: hospitalAdmin.hospital

        }).sort({

            createdAt: -1

        });

        res.render("hospital/viewDoctor", {

            doctors

        });

    }

    catch (error) {

        console.log("VIEW DOCTOR ERROR");
        console.log(error);

        res.send("Error fetching doctors");

    }

};

/* =====================================================
   EDIT PAGE
===================================================== */

exports.editPage = async (req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {

            return res.send("Doctor not found");

        }

        res.render("hospital/editDoctor", {

            doctor

        });

    }

    catch (error) {

        console.log(error);

        res.send("Error loading doctor");

    }

};

/* =====================================================
   UPDATE DOCTOR
===================================================== */

exports.updateDoctor = async (req, res) => {

    try {

        const { name, email } = req.body;

        await Doctor.findByIdAndUpdate(

            req.params.id,

            {

                name,

                email

            }

        );

        res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log(error);

        res.send("Error updating doctor");

    }

};

/* =====================================================
   DELETE DOCTOR
===================================================== */

exports.deleteDoctor = async (req, res) => {

    try {

        await Doctor.findByIdAndDelete(req.params.id);

        res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log(error);

        res.send("Error deleting doctor");

    }

};