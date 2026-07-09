/*
==================================================
AUTH API CONTROLLER
Hospital RBAC System
==================================================
*/

const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const PlatformAdmin = require("../../models/PlatformAdmin");
const HospitalAdmin = require("../../models/HospitalAdmin");

const { generateToken } = require("../../utils/jwt");

const {
    sendPasswordResetEmail
} = require("../../services/emailService");

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

        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordValid) {

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

            role: "platform_admin",

            permissions: []

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

            .populate("hospital", "name address status");

        if (!admin) {

            return apiResponse.error(

                res,

                "Invalid Email or Password",

                401

            );

        }

        const isPasswordValid = await bcrypt.compare(

            password,

            admin.password

        );

        if (!isPasswordValid) {

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

            permissions: admin.permissions || []

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

                    hospital: {

                        id: admin.hospital._id,

                        name: admin.hospital.name,

                        address: admin.hospital.address,

                        status: admin.hospital.status

                    },

                    permissions: admin.permissions || []

                }

            }

        );

    }

    catch (error) {

        console.error(error);

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
/* ==================================================
   FORGOT PASSWORD
================================================== */

exports.forgotPassword = async (req, res) => {

    try {

        const email = req.body.email.trim().toLowerCase();

        console.log("====================================");
        console.log("Forgot Password Request");
        console.log("Email:", email);
        console.log("====================================");

        const admin = await HospitalAdmin.findOne({ email });

        if (!admin) {

            console.log("Hospital Admin Not Found");

            return apiResponse.error(

                res,

                "Hospital Admin not found.",

                404

            );

        }

        /* ==========================================
           GENERATE RESET TOKEN
        ========================================== */

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        /* ==========================================
           SAVE TOKEN
        ========================================== */

        admin.resetPasswordToken = resetToken;

        admin.resetPasswordExpires = new Date(

            Date.now() + (15 * 60 * 1000)

        );

        await admin.save();

        /* ==========================================
           CREATE RESET LINK
        ========================================== */

        const resetLink =
            `http://localhost:3000/reset-password?token=${resetToken}`;

        /* ==========================================
           SEND RESET EMAIL
        ========================================== */

        await sendPasswordResetEmail({

            name: admin.name,

            email: admin.email,

            resetLink

        });

        console.log("====================================");
        console.log("Password Reset Email Sent");
        console.log(admin.email);
        console.log("====================================");

        /* ==========================================
           SUCCESS
        ========================================== */

        return apiResponse.success(

            res,

            "Password reset link has been sent successfully."

        );

    }

    catch (error) {

        console.error(error);

        return apiResponse.error(

            res,

            "Unable to process forgot password request.",

            500

        );

    }

};

/* ==================================================
   SEND OTP
================================================== */

exports.sendOTP = async (req, res) => {

    try {

        const email = req.body.email.trim().toLowerCase();

        const admin = await HospitalAdmin.findOne({ email });

        if (!admin) {

            return apiResponse.error(

                res,

                "Hospital Admin not found.",

                404

            );

        }

        /* ==========================================
           GENERATE 6-DIGIT OTP
        ========================================== */

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        /* ==========================================
           SAVE OTP
        ========================================== */

        admin.otp = otp;

        admin.otpExpires = new Date(

            Date.now() + (10 * 60 * 1000)

        );

        await admin.save();

        /* ==========================================
           SEND EMAIL
        ========================================== */

        const {

            sendOTPEmail

        } = require("../../services/emailService");

        await sendOTPEmail({

            name: admin.name,

            email: admin.email,

            otp

        });

        return apiResponse.success(

            res,

            "OTP sent successfully."

        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(

            res,

            "Unable to send OTP.",

            500

        );

    }

};

/* ==================================================
   VERIFY OTP
================================================== */

exports.verifyOTP = async (req, res) => {

    try {

        const {

            email,

            otp

        } = req.body;

        const admin = await HospitalAdmin.findOne({

            email: email.trim().toLowerCase(),

            otp,

            otpExpires: {

                $gt: Date.now()

            }

        });

        if (!admin) {

            return apiResponse.error(

                res,

                "Invalid or expired OTP.",

                400

            );

        }

        /* ==========================================
           CLEAR OTP
        ========================================== */

        admin.otp = null;

        admin.otpExpires = null;

        await admin.save();

        return apiResponse.success(

            res,

            "OTP verified successfully."

        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(

            res,

            "Unable to verify OTP.",

            500

        );

    }

};

/* ==================================================
   RESET PASSWORD
================================================== */

exports.resetPassword = async (req, res) => {

    try {

        const {
            token,
            password
        } = req.body;

        const admin = await HospitalAdmin.findOne({

            resetPasswordToken: token,

            resetPasswordExpires: {
                $gt: Date.now()
            }

        });

        if (!admin) {

            return apiResponse.error(

                res,

                "Invalid or expired reset token.",

                400

            );

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        admin.password = hashedPassword;

        admin.resetPasswordToken = null;

        admin.resetPasswordExpires = null;

        await admin.save();

        return apiResponse.success(

            res,

            "Password reset successful."

        );

    }

    catch (error) {

        console.log(error);

        return apiResponse.error(

            res,

            "Unable to reset password.",

            500

        );

    }

};