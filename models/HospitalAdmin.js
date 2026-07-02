const mongoose = require("mongoose");

const hospitalAdminSchema = new mongoose.Schema(
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

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: "hospital_admin"
        },

        // 🔐 RBAC PERMISSIONS (NEW)
        permissions: {
            type: [String],
            default: []
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("HospitalAdmin", hospitalAdminSchema);