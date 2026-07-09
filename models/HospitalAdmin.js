/*
==================================================
HOSPITAL ADMIN MODEL
Hospital RBAC System
==================================================
*/

const mongoose = require("mongoose");

const hospitalAdminSchema = new mongoose.Schema(

    {

        /* ==================================================
           HOSPITAL
        ================================================== */

        hospital: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Hospital",

            required: true

        },

        /* ==================================================
           NAME
        ================================================== */

        name: {

            type: String,

            required: true,

            trim: true

        },

        /* ==================================================
           EMAIL
        ================================================== */

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        /* ==================================================
           PASSWORD
        ================================================== */

        password: {

            type: String,

            required: true

        },

        /* ==================================================
           ROLE
        ================================================== */

        role: {

            type: String,

            default: "hospital_admin"

        },

        /* ==================================================
           RBAC PERMISSIONS
        ================================================== */

        permissions: {

            type: [String],

            default: []

        },

        /* ==================================================
           RESET PASSWORD TOKEN
        ================================================== */

        resetPasswordToken: {

            type: String,

            default: null

        },

        /* ==================================================
           RESET PASSWORD EXPIRY
        ================================================== */

        resetPasswordExpires: {

            type: Date,

            default: null

        },

        /* ==================================================
           OTP CODE
        ================================================== */

        otp: {

            type: String,

            default: null

        },

        /* ==================================================
           OTP EXPIRY
        ================================================== */

        otpExpires: {

            type: Date,

            default: null

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "HospitalAdmin",
    hospitalAdminSchema
);