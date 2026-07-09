/*
==================================================
HOSPITAL ADMIN API CONTROLLER
Hospital RBAC System
==================================================
*/

const HospitalAdmin = require("../../models/HospitalAdmin");
const Hospital = require("../../models/Hospital");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const apiResponse = require("../utils/apiResponse");

const {
    sendWelcomeEmail
} = require("../../services/emailService");

/* =====================================================
   CREATE HOSPITAL ADMIN
===================================================== */

exports.createHospitalAdmin = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return apiResponse.error(
                res,
                "Validation Failed",
                400,
                errors.array()
            );

        }

        const {
            hospital,
            name,
            email,
            password,
            permissions
        } = req.body;

        /* =====================================================
           CHECK HOSPITAL
        ===================================================== */

        const hospitalExists = await Hospital.findById(hospital);

        if (!hospitalExists) {

            return apiResponse.error(
                res,
                "Hospital not found.",
                404
            );

        }

        /* =====================================================
           CHECK DUPLICATE EMAIL
        ===================================================== */

        const adminExists = await HospitalAdmin.findOne({ email });

        if (adminExists) {

            return apiResponse.error(
                res,
                "Hospital Admin already exists.",
                409
            );

        }

        /* =====================================================
           HASH PASSWORD
        ===================================================== */

        const temporaryPassword = password;

        const hashedPassword = await bcrypt.hash(
            temporaryPassword,
            10
        );

        /* =====================================================
           CREATE ADMIN
        ===================================================== */

        let admin = await HospitalAdmin.create({

            hospital,

            name,

            email,

            password: hashedPassword,

            permissions

        });

        /* =====================================================
           SEND WELCOME EMAIL
        ===================================================== */

        await sendWelcomeEmail({

            hospitalName: hospitalExists.name,

            name,

            email,

            password: temporaryPassword

        });

        /* =====================================================
           LOAD COMPLETE ADMIN
        ===================================================== */

        admin = await HospitalAdmin.findById(admin._id)

            .populate("hospital", "name address status")

            .select("-password -__v");

        /* =====================================================
           SUCCESS RESPONSE
        ===================================================== */

        return apiResponse.success(
            res,
            "Hospital Admin created successfully.",
            admin,
            201
        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(
            res,
            "Server Error",
            500
        );

    }

};

/* =====================================================
   GET ALL HOSPITAL ADMINS
===================================================== */

exports.getHospitalAdmins = async (req, res) => {

    try {

        const admins = await HospitalAdmin.find()

            .populate("hospital", "name address status")

            .select("-password -__v")

            .sort({
                createdAt: -1
            });

        return apiResponse.success(
            res,
            "Hospital Admin list fetched successfully.",
            admins
        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(
            res,
            "Server Error",
            500
        );

    }

};

/* =====================================================
   GET SINGLE HOSPITAL ADMIN
===================================================== */

exports.getHospitalAdmin = async (req, res) => {

    try {

        const admin = await HospitalAdmin.findById(req.params.id)

            .populate("hospital", "name address status")

            .select("-password -__v");

        if (!admin) {

            return apiResponse.error(
                res,
                "Hospital Admin not found.",
                404
            );

        }

        return apiResponse.success(
            res,
            "Hospital Admin fetched successfully.",
            admin
        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(
            res,
            "Server Error",
            500
        );

    }

};

/* =====================================================
   UPDATE HOSPITAL ADMIN
===================================================== */

exports.updateHospitalAdmin = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return apiResponse.error(
                res,
                "Validation Failed",
                400,
                errors.array()
            );

        }

        let admin = await HospitalAdmin.findById(req.params.id);

        if (!admin) {

            return apiResponse.error(
                res,
                "Hospital Admin not found.",
                404
            );

        }

        const {
            hospital,
            name,
            email,
            password,
            permissions
        } = req.body;

        const duplicate = await HospitalAdmin.findOne({

            email,

            _id: {
                $ne: req.params.id
            }

        });

        if (duplicate) {

            return apiResponse.error(
                res,
                "Email already exists.",
                409
            );

        }

        admin.hospital = hospital;
        admin.name = name;
        admin.email = email;
        admin.permissions = permissions;

        if (password && password.trim() !== "") {

            admin.password = await bcrypt.hash(password, 10);

        }

        await admin.save();

        admin = await HospitalAdmin.findById(admin._id)

            .populate("hospital", "name address status")

            .select("-password -__v");

        return apiResponse.success(
            res,
            "Hospital Admin updated successfully.",
            admin
        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(
            res,
            "Server Error",
            500
        );

    }

};

/* =====================================================
   DELETE HOSPITAL ADMIN
===================================================== */

exports.deleteHospitalAdmin = async (req, res) => {

    try {

        const admin = await HospitalAdmin.findById(req.params.id);

        if (!admin) {

            return apiResponse.error(
                res,
                "Hospital Admin not found.",
                404
            );

        }

        await admin.deleteOne();

        return apiResponse.success(
            res,
            "Hospital Admin deleted successfully."
        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(
            res,
            "Server Error",
            500
        );

    }

};