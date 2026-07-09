/*
==================================================
DOCTOR MODEL
Hospital RBAC System
==================================================
*/

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(

    {

        hospital: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Hospital",

            required: true

        },

        name: {

            type: String,

            required: true,

            trim: true

        },

        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },

        phone: {

            type: String,

            required: true,

            trim: true

        },

        gender: {

            type: String,

            enum: [

                "Male",

                "Female",

                "Other"

            ],

            required: true

        },

        dateOfBirth: {

            type: Date,

            required: true

        },

        qualification: {

            type: String,

            required: true,

            trim: true

        },

        specialization: {

            type: String,

            required: true,

            trim: true

        },

        experience: {

            type: Number,

            required: true,

            min: 0

        },

        consultationFee: {

            type: Number,

            required: true,

            min: 0

        },

        address: {

            type: String,

            required: true,

            trim: true

        },

        status: {

            type: String,

            enum: [

                "active",

                "inactive"

            ],

            default: "active"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "Doctor",

    doctorSchema

);