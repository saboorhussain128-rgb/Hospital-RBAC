const Hospital = require("../models/Hospital");
const { validationResult } = require("express-validator");

/* =====================================================
   CREATE HOSPITAL PAGE
===================================================== */

exports.createPage = (req, res) => {

    res.render("platform/createHospital", {

        errors: [],
        body: {}

    });

};

/* =====================================================
   CREATE HOSPITAL
===================================================== */

exports.createHospital = async (req, res) => {

    try {

        /* ===============================
           VALIDATION
        =============================== */

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.render("platform/createHospital", {

                errors: errors.array(),

                body: req.body

            });

        }

        const {

            name,
            address,
            status

        } = req.body;

        /* ===============================
           DUPLICATE HOSPITAL CHECK
        =============================== */

        const exists = await Hospital.findOne({

            name: name.trim()

        });

        if (exists) {

            return res.render("platform/createHospital", {

                body: req.body,

                errors: [

                    {

                        msg: "Hospital already exists."

                    }

                ]

            });

        }

        /* ===============================
           CREATE HOSPITAL
        =============================== */

        await Hospital.create({

            name,
            address,
            status

        });

        return res.redirect("/platform/view-hospital");

    }

    catch (error) {

        console.log(error);

        return res.status(500).send("Error creating hospital.");

    }

};

/* =====================================================
   VIEW HOSPITALS
===================================================== */

exports.viewHospitals = async (req, res) => {

    try {

        const hospitals = await Hospital.find()

            .sort({

                createdAt: -1

            });

        res.render("platform/viewHospital", {

            hospitals

        });

    }

    catch (error) {

        console.log(error);

        res.send("Error fetching hospitals");

    }

};

/* =====================================================
   EDIT HOSPITAL PAGE
===================================================== */

exports.editPage = async (req, res) => {

    try {

        const hospital = await Hospital.findById(

            req.params.id

        );

        if (!hospital) {

            return res.send("Hospital not found.");

        }

        res.render("platform/editHospital", {

            hospital

        });

    }

    catch (error) {

        console.log(error);

        res.send("Error loading edit page");

    }

};

/* =====================================================
   UPDATE HOSPITAL
===================================================== */

exports.updateHospital = async (req, res) => {

    try {

        const {

            name,
            address,
            status

        } = req.body;

        await Hospital.findByIdAndUpdate(

            req.params.id,

            {

                name,
                address,
                status

            },

            {

                new: true

            }

        );

        res.redirect("/platform/view-hospital");

    }

    catch (error) {

        console.log(error);

        res.send("Error updating hospital");

    }

};

/* =====================================================
   DELETE HOSPITAL
===================================================== */

exports.deleteHospital = async (req, res) => {

    try {

        await Hospital.findByIdAndDelete(

            req.params.id

        );

        res.redirect("/platform/view-hospital");

    }

    catch (error) {

        console.log(error);

        res.send("Error deleting hospital");

    }

};