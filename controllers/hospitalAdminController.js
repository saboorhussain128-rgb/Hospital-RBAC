const HospitalAdmin = require("../models/HospitalAdmin");
const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");

/* =====================================================
   CREATE PAGE
===================================================== */

exports.createPage = async (req, res) => {
    try {

        const hospitals = await Hospital.find().sort({ name: 1 });

        res.render("platform/createHospitalAdmin", {
            hospitals
        });

    } catch (error) {

        console.log(error);
        res.send("Error loading page.");

    }
};

/* =====================================================
   CREATE HOSPITAL ADMIN
===================================================== */

exports.createAdmin = async (req, res) => {

    try {

        const {
            hospital,
            name,
            email,
            password
        } = req.body;

        let permissions = req.body.permissions || [];

        if (!Array.isArray(permissions)) {
            permissions = [permissions];
        }

        if (permissions.length === 0) {
            return res.send("Please select at least one permission.");
        }

        const exists = await HospitalAdmin.findOne({ email });

        if (exists) {
            return res.send("Hospital Admin already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await HospitalAdmin.create({

            hospital,
            name,
            email,
            password: hashedPassword,
            permissions

        });

        res.redirect("/platform/view-hospital-admin");

    } catch (error) {

        console.log(error);
        res.send("Error creating Hospital Admin.");

    }

};

/* =====================================================
   VIEW ADMINS
===================================================== */

exports.viewAdmins = async (req, res) => {

    try {

        const admins = await HospitalAdmin.find()
            .populate("hospital")
            .sort({ createdAt: -1 });

        res.render("platform/viewHospitalAdmin", {
            admins
        });

    } catch (error) {

        console.log(error);
        res.send("Error fetching admins.");

    }

};

/* =====================================================
   EDIT PAGE
===================================================== */

exports.editPage = async (req, res) => {

    try {

        const admin = await HospitalAdmin.findById(req.params.id);

        const hospitals = await Hospital.find().sort({ name: 1 });

        if (!admin) {
            return res.send("Hospital Admin not found.");
        }

        res.render("platform/editHospitalAdmin", {

            admin,
            hospitals

        });

    } catch (error) {

        console.log(error);
        res.send("Error loading edit page.");

    }

};

/* =====================================================
   UPDATE ADMIN
===================================================== */

exports.updateAdmin = async (req, res) => {

    try {

        const {

            hospital,
            name,
            email,
            password

        } = req.body;

        let permissions = req.body.permissions || [];

        if (!Array.isArray(permissions)) {
            permissions = [permissions];
        }

        if (permissions.length === 0) {
            return res.send("Please select at least one permission.");
        }

        const updateData = {

            hospital,
            name,
            email,
            permissions

        };

        if (password && password.trim() !== "") {

            updateData.password = await bcrypt.hash(password, 10);

        }

        await HospitalAdmin.findByIdAndUpdate(

            req.params.id,

            updateData,

            { new: true }

        );

        res.redirect("/platform/view-hospital-admin");

    } catch (error) {

        console.log(error);
        res.send("Error updating Hospital Admin.");

    }

};

/* =====================================================
   DELETE ADMIN
===================================================== */

exports.deleteAdmin = async (req, res) => {

    try {

        await HospitalAdmin.findByIdAndDelete(req.params.id);

        res.redirect("/platform/view-hospital-admin");

    } catch (error) {

        console.log(error);
        res.send("Error deleting Hospital Admin.");

    }

};