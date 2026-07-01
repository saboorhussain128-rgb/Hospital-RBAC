const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);