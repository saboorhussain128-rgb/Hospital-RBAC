const Doctor = require("../models/Doctor");
const { validationResult } = require("express-validator");

/* =====================================================
   CREATE DOCTOR PAGE
===================================================== */

exports.createPage = (req, res) => {

    res.render("hospital/createDoctor", {

        errors: [],

        body: {}

    });

};

/* =====================================================
   CREATE DOCTOR
===================================================== */

exports.createDoctor = async (req, res) => {

    try {

        const hospitalAdmin = req.user;

        if (!hospitalAdmin) {

            return res.redirect("/hospital/login");

        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.render("hospital/createDoctor", {

                errors: errors.array(),

                body: req.body

            });

        }

        const {

            name,

            email

        } = req.body;

        const doctorExists = await Doctor.findOne({

            email,

            hospital: hospitalAdmin.hospital

        });

        if (doctorExists) {

            return res.render("hospital/createDoctor", {

                errors: [

                    {

                        msg: "Doctor already exists with this email."

                    }

                ],

                body: req.body

            });

        }

        await Doctor.create({

            hospital: hospitalAdmin.hospital,

            name,

            email

        });

        res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log(error);

        res.send("Error creating doctor");

    }

};

/* =====================================================
   VIEW DOCTORS
===================================================== */

exports.viewDoctors = async (req, res) => {

    try {

        const hospitalAdmin = req.user;

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

        console.log(error);

        res.send("Error fetching doctors");

    }

};

/* =====================================================
   EDIT PAGE
===================================================== */

exports.editPage = async (req, res) => {

    try {

        const hospitalAdmin = req.user;

        if (!hospitalAdmin) {

            return res.redirect("/hospital/login");

        }

        const doctor = await Doctor.findOne({

            _id: req.params.id,

            hospital: hospitalAdmin.hospital

        });

        if (!doctor) {

            return res.send("Doctor not found.");

        }

        res.render("hospital/editDoctor", {

            doctor,

            errors: [],

            body: {}

        });

    }

    catch (error) {

        console.log(error);

        res.send("Error loading doctor.");

    }

};

/* =====================================================
   UPDATE DOCTOR
===================================================== */

exports.updateDoctor = async (req, res) => {

    try {

        const hospitalAdmin = req.user;

        if (!hospitalAdmin) {

            return res.redirect("/hospital/login");

        }

        const errors = validationResult(req);

        const doctor = await Doctor.findOne({

            _id: req.params.id,

            hospital: hospitalAdmin.hospital

        });

        if (!doctor) {

            return res.send("Doctor not found.");

        }

        if (!errors.isEmpty()) {

            return res.render("hospital/editDoctor", {

                doctor,

                errors: errors.array(),

                body: req.body

            });

        }

        doctor.name = req.body.name;

        doctor.email = req.body.email;

        await doctor.save();

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

        const hospitalAdmin = req.user;

        if (!hospitalAdmin) {

            return res.redirect("/hospital/login");

        }

        await Doctor.findOneAndDelete({

            _id: req.params.id,

            hospital: hospitalAdmin.hospital

        });

        res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log(error);

        res.send("Error deleting doctor");

    }

};