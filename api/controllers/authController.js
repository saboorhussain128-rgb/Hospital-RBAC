const bcrypt = require("bcryptjs");

const PlatformAdmin = require("../../models/PlatformAdmin");
const HospitalAdmin = require("../../models/HospitalAdmin");

const { generateToken } = require("../../utils/jwt");
const apiResponse = require("../utils/apiResponse");

/* =====================================================
   PLATFORM ADMIN LOGIN
===================================================== */

exports.platformLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return apiResponse.error(
                res,
                "Email and Password are required.",
                400
            );

        }

        const admin = await PlatformAdmin.findOne({ email });

        if (!admin) {

            return apiResponse.error(
                res,
                "Invalid Email or Password.",
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
                "Invalid Email or Password.",
                401
            );

        }

        const token = generateToken({

            id: admin._id,
            role: "platform_admin",
            email: admin.email

        });

        return apiResponse.success(

            res,

            {

                token,

                user: {

                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    role: "platform_admin"

                }

            },

            "Platform Admin Login Successful."

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
   HOSPITAL ADMIN LOGIN
===================================================== */

exports.hospitalLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return apiResponse.error(
                res,
                "Email and Password are required.",
                400
            );

        }

        const admin = await HospitalAdmin.findOne({

            email

        }).populate("hospital");

        if (!admin) {

            return apiResponse.error(
                res,
                "Invalid Email or Password.",
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
                "Invalid Email or Password.",
                401
            );

        }

        const token = generateToken({

            id: admin._id,
            hospital: admin.hospital._id,
            role: "hospital_admin",
            permissions: admin.permissions

        });

        return apiResponse.success(

            res,

            {

                token,

                user: admin

            },

            "Hospital Admin Login Successful."

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
   PROFILE
===================================================== */

exports.profile = async (req, res) => {

    return apiResponse.success(

        res,

        req.user,

        "Profile Loaded."

    );

};

/* =====================================================
   LOGOUT
===================================================== */

exports.logout = async (req, res) => {

    return apiResponse.success(

        res,

        null,

        "Logout Successful."

    );

};