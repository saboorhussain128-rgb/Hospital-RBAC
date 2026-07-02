const Hospital = require("../models/Hospital");

/* =====================================================
   CREATE HOSPITAL PAGE
===================================================== */

exports.createPage = (req, res) => {

    res.render("platform/createHospital");

};

/* =====================================================
   CREATE HOSPITAL
===================================================== */

exports.createHospital = async (req, res) => {

    try {

        console.log("========== REQUEST BODY ==========");
        console.log(req.body);

        const { name, address, status } = req.body;

        const hospital = new Hospital({
            name,
            address,
            status
        });

        console.log("Hospital Object:", hospital);

        await hospital.save();

        console.log("Hospital saved successfully.");

        return res.redirect("/platform/view-hospital");

    } catch (error) {

        console.log("========== CREATE HOSPITAL ERROR ==========");
        console.error(error);
        console.log("===========================================");

        return res.status(500).send(error.stack);

    }

};

/* =====================================================
   VIEW HOSPITALS
===================================================== */

exports.viewHospitals = async (req, res) => {

    try {

        const hospitals = await Hospital.find().sort({

            createdAt: -1

        });

        res.render("platform/viewHospital", {

            hospitals

        });

    } catch (error) {

        console.log(error);

        res.send("Error fetching hospitals");

    }

};

/* =====================================================
   EDIT HOSPITAL PAGE
===================================================== */

exports.editPage = async (req, res) => {

    try {

        const hospital = await Hospital.findById(req.params.id);

        res.render("platform/editHospital", {

            hospital

        });

    } catch (error) {

        console.log(error);

        res.send("Error loading edit page");

    }

};

/* =====================================================
   UPDATE HOSPITAL
===================================================== */

exports.updateHospital = async (req, res) => {

    try {

        const { name, address, status } = req.body;

        await Hospital.findByIdAndUpdate(

            req.params.id,

            {

                name,
                address,
                status

            }

        );

        res.redirect("/platform/view-hospital");

    } catch (error) {

        console.log(error);

        res.send("Error updating hospital");

    }

};

/* =====================================================
   DELETE HOSPITAL
===================================================== */

exports.deleteHospital = async (req, res) => {

    try {

        await Hospital.findByIdAndDelete(req.params.id);

        res.redirect("/platform/view-hospital");

    } catch (error) {

        console.log(error);

        res.send("Error deleting hospital");

    }

};