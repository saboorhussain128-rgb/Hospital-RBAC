const Hospital = require("../../models/Hospital");
const { validationResult } = require("express-validator");
const apiResponse = require("../utils/apiResponse");

/* =====================================================
   CREATE HOSPITAL
===================================================== */

exports.createHospital = async (req, res) => {

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

        const { name, address, status } = req.body;

        const hospitalExists = await Hospital.findOne({ name });

        if (hospitalExists) {

            return apiResponse.error(

                res,

                "Hospital already exists.",

                409

            );

        }

        const hospital = await Hospital.create({

            name,
            address,
            status

        });

        return apiResponse.success(

            res,

            "Hospital created successfully.",

            hospital,

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
   GET ALL HOSPITALS
===================================================== */

exports.getHospitals = async (req, res) => {

    try {

        const hospitals = await Hospital.find()

            .sort({ createdAt: -1 });

        return apiResponse.success(

            res,

            "Hospitals fetched successfully.",

            hospitals

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
   GET SINGLE HOSPITAL
===================================================== */

exports.getHospital = async (req, res) => {

    try {

        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {

            return apiResponse.error(

                res,

                "Hospital not found.",

                404

            );

        }

        return apiResponse.success(

            res,

            "Hospital fetched successfully.",

            hospital

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
   UPDATE HOSPITAL
===================================================== */

exports.updateHospital = async (req, res) => {

    try {

        const hospital = await Hospital.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!hospital) {

            return apiResponse.error(

                res,

                "Hospital not found.",

                404

            );

        }

        return apiResponse.success(

            res,

            "Hospital updated successfully.",

            hospital

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
   DELETE HOSPITAL
===================================================== */

exports.deleteHospital = async (req, res) => {

    try {

        const hospital = await Hospital.findByIdAndDelete(

            req.params.id

        );

        if (!hospital) {

            return apiResponse.error(

                res,

                "Hospital not found.",

                404

            );

        }

        return apiResponse.success(

            res,

            "Hospital deleted successfully."

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