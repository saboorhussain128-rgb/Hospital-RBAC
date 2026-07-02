const HospitalAdmin = require("../models/HospitalAdmin");
const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");

/* -------------------------
   CREATE PAGE
--------------------------*/
exports.createPage = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.render("platform/createHospitalAdmin", { hospitals });
    } catch (error) {
        console.log("Create Page Error:", error);
        res.send("Error loading create admin page");
    }
};

exports.createAdmin = async (req, res) => {

    try {

        const {
            hospital,
            name,
            email,
            password
        } = req.body;

        let permissions = req.body.permissions || [];

        // Convert single checkbox selection to array
        if (!Array.isArray(permissions)) {
            permissions = [permissions];
        }

        // At least one permission must be selected
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

/* -------------------------
   VIEW ADMINS
--------------------------*/
exports.viewAdmins = async (req, res) => {
    try {
        const admins = await HospitalAdmin.find().populate("hospital");
        res.render("platform/viewHospitalAdmin", { admins });
    } catch (error) {
        console.log("View Admin Error:", error);
        res.send("Error fetching admins");
    }
};

/* -------------------------
   DELETE ADMIN
--------------------------*/
exports.deleteAdmin = async (req, res) => {
    try {
        await HospitalAdmin.findByIdAndDelete(req.params.id);
        res.redirect("/platform/view-hospital-admin");
    } catch (error) {
        console.log("Delete Admin Error:", error);
        res.send("Error deleting admin");
    }
};