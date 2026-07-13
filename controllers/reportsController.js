/*
==================================================
REPORTS CONTROLLER
Hospital RBAC System
==================================================
*/

const Hospital = require("../models/Hospital");
const HospitalAdmin = require("../models/HospitalAdmin");
const Doctor = require("../models/Doctor");
const AuditLog = require("../models/AuditLog");

/* ==================================================
   REPORTS DASHBOARD
================================================== */

exports.dashboard = async (req, res) => {

    try {

        /* ==========================================
           TOTAL COUNTS
        ========================================== */

        const totalHospitals = await Hospital.countDocuments();

        const activeHospitals = await Hospital.countDocuments({

            status: "active"

        });

        const inactiveHospitals = await Hospital.countDocuments({

            status: "inactive"

        });

        const totalAdmins = await HospitalAdmin.countDocuments();

        const totalDoctors = await Doctor.countDocuments();

        const totalAuditLogs = await AuditLog.countDocuments();

        /* ==========================================
           HOSPITAL REPORT
        ========================================== */

        const hospitals = await Hospital.find()

            .sort({

                createdAt: -1

            });

        const reportData = [];

        for (const hospital of hospitals) {

            const doctorCount = await Doctor.countDocuments({

                hospital: hospital._id

            });

            const adminCount = await HospitalAdmin.countDocuments({

                hospital: hospital._id

            });

            reportData.push({

                hospitalName: hospital.name,

                address: hospital.address,

                status: hospital.status,

                doctorCount,

                adminCount

            });

        }

        /* ==========================================
           RENDER PAGE
        ========================================== */

        res.render("platform/reports", {

            totalHospitals,

            activeHospitals,

            inactiveHospitals,

            totalAdmins,

            totalDoctors,

            totalAuditLogs,

            reportData

        });

    }

    catch (error) {

        console.log(error);

        res.send("Unable to load reports.");

    }

};