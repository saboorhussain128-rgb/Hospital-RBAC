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

        console.log("====================================");
        console.log("AUDIT SERVICE EXECUTED");
        console.log("Module      :", module);
        console.log("Action      :", action);
        console.log("Description :", description);
        console.log("====================================");

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

        let fileName = "system.log";

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

        }

        logger.audit(

            fileName,

            `[${action}] ${description} | User: ${user.name || "Guest"} | IP: ${req.ip}`

        );

        console.log("Audit Log Saved Successfully");

    }

    catch (error) {

        console.log("====================================");
        console.log("AUDIT LOG ERROR");
        console.log(error);
        console.log("====================================");

        logger.error(

            "audit.log",

            error.stack || error.message

        );

    }

};

module.exports = createAuditLog;