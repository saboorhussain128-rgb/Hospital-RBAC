/*
==================================================
AUDIT LOG SERVICE
Hospital RBAC System
==================================================
*/

const AuditLog = require("../models/AuditLog");
const logger = require("./loggerService");

/* ==================================================
   CREATE AUDIT LOG
================================================== */

const createAuditLog = async ({

    req,

    module,

    action,

    description,

    status = "SUCCESS"

}) => {

    try {

        const user = req.session.user || req.user || {};

        await AuditLog.create({

            user: user.id || null,

            userName: user.name || "Guest",

            role: user.role || "Unknown",

            hospital: user.hospital || null,

            module,

            action,

            description,

            method: req.method,

            url: req.originalUrl,

            ip: req.ip,

            status

        });

        /* ==========================================
           WRITE INTO LOG FILE
        ========================================== */

        let fileName = "";

        switch (module) {

            case "Hospital":

                fileName = "hospital.log";
                break;

            case "Hospital Admin":

                fileName = "hospitalAdmin.log";
                break;

            case "Doctor":

                fileName = "doctor.log";
                break;

            default:

                fileName = "system.log";

        }

        logger.audit(

            fileName,

            `[${action}] ${description} | User: ${user.name || "Guest"} | IP: ${req.ip}`

        );

    }

    catch (error) {

        console.log("Audit Log Error:", error.message);

    }

};

module.exports = createAuditLog;