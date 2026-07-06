/*
==================================================
AUTH API CONTROLLER
Hospital RBAC System
==================================================
*/

const bcrypt = require("bcryptjs");

const PlatformAdmin = require("../../models/PlatformAdmin");
const HospitalAdmin = require("../../models/HospitalAdmin");

const { generateToken } = require("../../utils/jwt");

const apiResponse = require("../utils/apiResponse");

/* ==================================================
   PLATFORM ADMIN LOGIN
================================================== */

exports.platformLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await PlatformAdmin.findOne({ email });

        if (!admin) {

            return apiResponse.error(

                res,

                "Invalid Email or Password",

                401

            );

        }

        const matched = await bcrypt.compare(

            password,

            admin.password

        );

        if (!matched) {

            return apiResponse.error(

                res,

                "Invalid Email or Password",

                401

            );

        }

        const token = generateToken({

            id: admin._id,

            name: admin.name,

            email: admin.email,

            role: "platform_admin"

        });

        return apiResponse.success(

            res,

            "Platform Admin Login Successful",

            {

                token,

                user: {

                    id: admin._id,

                    name: admin.name,

                    email: admin.email,

                    role: "platform_admin"

                }

            }

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

/* ==================================================
   HOSPITAL ADMIN LOGIN
================================================== */

exports.hospitalLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await HospitalAdmin
            .findOne({ email })
            .populate("hospital");

        if (!admin) {

            return apiResponse.error(

                res,

                "Invalid Email or Password",

                401

            );

        }

        const matched = await bcrypt.compare(

            password,

            admin.password

        );

        if (!matched) {

            return apiResponse.error(

                res,

                "Invalid Email or Password",

                401

            );

        }

        const token = generateToken({

            id: admin._id,

            name: admin.name,

            email: admin.email,

            role: "hospital_admin",

            hospital: admin.hospital._id,

            hospitalName: admin.hospital.name,

            permissions: admin.permissions

        });

        return apiResponse.success(

            res,

            "Hospital Admin Login Successful",

            {

                token,

                user: {

                    id: admin._id,

                    name: admin.name,

                    email: admin.email,

                    role: "hospital_admin",

                    hospital: admin.hospital,

                    permissions: admin.permissions

                }

            }

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

/* ==================================================
   CURRENT PROFILE
================================================== */

exports.profile = async (req, res) => {

    return apiResponse.success(

        res,

        "Profile Loaded Successfully",

        req.user

    );

};

/* ==================================================
   LOGOUT
================================================== */

exports.logout = async (req, res) => {

    return apiResponse.success(

        res,

        "Logout Successful",

        null

    );

};