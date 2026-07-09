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

        const response = await Hospital.findById(hospital._id)
            .select("-__v");

        return apiResponse.success(
            res,
            "Hospital created successfully.",
            response,
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
   Pagination + Search + Filter + Sorting
===================================================== */

exports.getHospitals = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const status = req.query.status;

        let sort = { createdAt: -1 };

        if (req.query.sort) {

            switch (req.query.sort) {

                case "name":
                    sort = { name: 1 };
                    break;

                case "-name":
                    sort = { name: -1 };
                    break;

                case "createdAt":
                    sort = { createdAt: 1 };
                    break;

                case "-createdAt":
                    sort = { createdAt: -1 };
                    break;

            }

        }

        const filter = {};

        if (search) {

            filter.name = {
                $regex: search,
                $options: "i"
            };

        }

        if (status) {

            filter.status = status;

        }

        const totalRecords = await Hospital.countDocuments(filter);

        const hospitals = await Hospital.find(filter)

            .select("-__v")

            .sort(sort)

            .skip(skip)

            .limit(limit);

        return res.status(200).json({

            success: true,

            message: "Hospitals fetched successfully.",

            pagination: {

                currentPage: page,

                totalPages: Math.ceil(totalRecords / limit),

                totalRecords,

                pageSize: limit

            },

            data: hospitals

        });

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

        const hospital = await Hospital.findById(req.params.id)
            .select("-__v");

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
        ).select("-__v");

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

        const hospital = await Hospital.findByIdAndDelete(req.params.id);

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