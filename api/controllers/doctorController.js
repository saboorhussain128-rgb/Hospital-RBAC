const Doctor = require("../../models/Doctor");
const { validationResult } = require("express-validator");
const apiResponse = require("../utils/apiResponse");

/* =====================================================
   CREATE DOCTOR
===================================================== */

exports.createDoctor = async (req, res) => {

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

            name,

            email

        } = req.body;

        const hospital = req.user.hospital;

        const doctorExists = await Doctor.findOne({

            email,

            hospital

        });

        if (doctorExists) {

            return apiResponse.error(

                res,

                "Doctor already exists.",

                409

            );

        }

        const doctor = await Doctor.create({

            hospital,

            name,

            email

        });

        return apiResponse.success(

            res,

            "Doctor created successfully.",

            doctor,

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
   GET ALL DOCTORS
===================================================== */

exports.getDoctors = async (req, res) => {

    try {

        const doctors = await Doctor.find({

            hospital: req.user.hospital

        })

        .sort({

            createdAt: -1

        });

        return apiResponse.success(

            res,

            "Doctors fetched successfully.",

            doctors

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
   GET SINGLE DOCTOR
===================================================== */

exports.getDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findOne({

            _id: req.params.id,

            hospital: req.user.hospital

        });

        if (!doctor) {

            return apiResponse.error(

                res,

                "Doctor not found.",

                404

            );

        }

        return apiResponse.success(

            res,

            "Doctor fetched successfully.",

            doctor

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
   UPDATE DOCTOR
===================================================== */

exports.updateDoctor = async (req, res) => {

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

        const doctor = await Doctor.findOne({

            _id: req.params.id,

            hospital: req.user.hospital

        });

        if (!doctor) {

            return apiResponse.error(

                res,

                "Doctor not found.",

                404

            );

        }

        if (req.body.email) {

            const duplicate = await Doctor.findOne({

                email: req.body.email,

                hospital: req.user.hospital,

                _id: {

                    $ne: req.params.id

                }

            });

            if (duplicate) {

                return apiResponse.error(

                    res,

                    "Doctor email already exists.",

                    409

                );

            }

        }

        if (req.body.name !== undefined) {

            doctor.name = req.body.name;

        }

        if (req.body.email !== undefined) {

            doctor.email = req.body.email;

        }

        await doctor.save();

        return apiResponse.success(

            res,

            "Doctor updated successfully.",

            doctor

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
   DELETE DOCTOR
===================================================== */

exports.deleteDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findOne({

            _id: req.params.id,

            hospital: req.user.hospital

        });

        if (!doctor) {

            return apiResponse.error(

                res,

                "Doctor not found.",

                404

            );

        }

        await doctor.deleteOne();

        return apiResponse.success(

            res,

            "Doctor deleted successfully."

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