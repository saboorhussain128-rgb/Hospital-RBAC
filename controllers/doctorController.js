/*
=====================================================
DOCTOR CONTROLLER
Hospital RBAC System
=====================================================
*/

const Doctor = require("../models/Doctor");
const { validationResult } = require("express-validator");
const createAuditLog = require("../services/auditLogService");

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

        const hospitalAdmin = req.user || req.session.user;

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

        const doctor = await Doctor.create({

            hospital: hospitalAdmin.hospital,

            name,

            email

        });

        await createAuditLog({

            req,

            module: "Doctor",

            action: "Create",

            description: `Doctor "${doctor.name}" created successfully.`

        });

        return res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log(error);

        return res.send("Error creating doctor");

    }

};

/* =====================================================
   VIEW DOCTORS
===================================================== */

exports.viewDoctors = async (req, res) => {

    try {

        const hospitalAdmin = req.user || req.session.user;

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

        const hospitalAdmin = req.user || req.session.user;

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

        const hospitalAdmin = req.user || req.session.user;

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

        await createAuditLog({

            req,

            module: "Doctor",

            action: "Update",

            description: `Doctor "${doctor.name}" updated successfully.`

        });

        return res.redirect("/hospital/view-doctor");

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

        const hospitalAdmin = req.user || req.session.user;

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

        const doctorName = doctor.name;

        await doctor.deleteOne();

        await createAuditLog({

            req,

            module: "Doctor",

            action: "Delete",

            description: `Doctor "${doctorName}" deleted successfully.`

        });

        return res.redirect("/hospital/view-doctor");

    }

    catch (error) {

        console.log(error);

        res.send("Error deleting doctor");

    }

};