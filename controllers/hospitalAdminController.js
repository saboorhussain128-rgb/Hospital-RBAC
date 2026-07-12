/*
==================================================
HOSPITAL ADMIN CONTROLLER
Hospital RBAC System
==================================================
*/

const HospitalAdmin = require("../models/HospitalAdmin");
const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const { sendWelcomeEmail } = require("../services/emailService");
const createAuditLog = require("../services/auditLogService");

/* =====================================================
   CREATE PAGE
===================================================== */

exports.createPage = async (req, res) => {

    try {

        const hospitals = await Hospital.find().sort({ name: 1 });

        res.render("platform/createHospitalAdmin", {
            hospitals,
            errors: [],
            body: {}
        });

    }

    catch (error) {

        console.log(error);
        res.send("Error loading page.");

    }

};

/* =====================================================
   CREATE HOSPITAL ADMIN
===================================================== */

exports.createAdmin = async (req, res) => {

    try {

        const errors = validationResult(req);

        const hospitals = await Hospital.find().sort({ name: 1 });

        if (!errors.isEmpty()) {

            return res.render("platform/createHospitalAdmin", {
                hospitals,
                errors: errors.array(),
                body: req.body
            });

        }

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

        const exists = await HospitalAdmin.findOne({ email });

        if (exists) {

            return res.render("platform/createHospitalAdmin", {
                hospitals,
                errors: [
                    {
                        msg: "Hospital Admin already exists."
                    }
                ],
                body: req.body
            });

        }

        const temporaryPassword = password;

        const hashedPassword = await bcrypt.hash(
            temporaryPassword,
            10
        );

        const admin = await HospitalAdmin.create({

            hospital,
            name,
            email,
            password: hashedPassword,
            permissions

        });

        const hospitalData = await Hospital.findById(hospital);

        /* ==========================================
           AUDIT LOG
        ========================================== */

        await createAuditLog({

            req,
            module: "Hospital Admin",
            action: "Create",
            description: `Hospital Admin "${admin.name}" created for "${hospitalData.name}".`

        });

        /* ==========================================
           SEND EMAIL
        ========================================== */

        try {

            await sendWelcomeEmail({

                hospitalName: hospitalData.name,
                name,
                email,
                password: temporaryPassword

            });

            console.log("====================================");
            console.log("WELCOME EMAIL SENT");
            console.log("To :", email);
            console.log("====================================");

        }

        catch (emailError) {

            console.log(emailError.message);

        }

        res.redirect("/platform/view-hospital-admin");

    }

    catch (error) {

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

    }

    catch (error) {

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

        if (!admin) {
            return res.send("Hospital Admin not found.");
        }

        const hospitals = await Hospital.find().sort({ name: 1 });

        res.render("platform/editHospitalAdmin", {

            admin,
            hospitals

        });

    }

    catch (error) {

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

        const updateData = {

            hospital,
            name,
            email,
            permissions

        };

        if (password && password.trim() !== "") {

            updateData.password = await bcrypt.hash(password, 10);

        }

        const updatedAdmin = await HospitalAdmin.findByIdAndUpdate(

            req.params.id,
            updateData,
            { new: true }

        ).populate("hospital");

        await createAuditLog({

            req,
            module: "Hospital Admin",
            action: "Update",
            description: `Hospital Admin "${updatedAdmin.name}" updated successfully.`

        });

        res.redirect("/platform/view-hospital-admin");

    }

    catch (error) {

        console.log(error);
        res.send("Error updating Hospital Admin.");

    }

};

/* =====================================================
   DELETE ADMIN
===================================================== */

exports.deleteAdmin = async (req, res) => {

    try {

        const admin = await HospitalAdmin.findById(req.params.id)
            .populate("hospital");

        if (!admin) {

            return res.send("Hospital Admin not found.");

        }

        await createAuditLog({

            req,
            module: "Hospital Admin",
            action: "Delete",
            description: `Hospital Admin "${admin.name}" deleted from "${admin.hospital.name}".`

        });

        await HospitalAdmin.findByIdAndDelete(req.params.id);

        res.redirect("/platform/view-hospital-admin");

    }

    catch (error) {

        console.log(error);
        res.send("Error deleting Hospital Admin.");

    }

};