/*
==================================================
AUDIT LOG MODEL
Hospital RBAC System
==================================================
*/

const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(

    {

        /* ==========================================
           USER
        ========================================== */

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "HospitalAdmin",

            default: null

        },

        /* ==========================================
           USER NAME
        ========================================== */

        userName: {

            type: String,

            default: ""

        },

        /* ==========================================
           USER ROLE
        ========================================== */

        role: {

            type: String,

            default: ""

        },

        /* ==========================================
           HOSPITAL
        ========================================== */

        hospital: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Hospital",

            default: null

        },

        /* ==========================================
           MODULE
        ========================================== */

        module: {

            type: String,

            required: true

        },

        /* ==========================================
           ACTION
        ========================================== */

        action: {

            type: String,

            required: true

        },

        /* ==========================================
           DESCRIPTION
        ========================================== */

        description: {

            type: String,

            required: true

        },

        /* ==========================================
           REQUEST METHOD
        ========================================== */

        method: {

            type: String,

            default: ""

        },

        /* ==========================================
           REQUEST URL
        ========================================== */

        url: {

            type: String,

            default: ""

        },

        /* ==========================================
           IP ADDRESS
        ========================================== */

        ip: {

            type: String,

            default: ""

        },

        /* ==========================================
           STATUS
        ========================================== */

        status: {

            type: String,

            enum: [

                "SUCCESS",

                "FAILED"

            ],

            default: "SUCCESS"

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "AuditLog",

    auditLogSchema

);