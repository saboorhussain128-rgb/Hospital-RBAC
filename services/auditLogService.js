/*
==================================================
AUDIT LOG SERVICE
Hospital RBAC System
==================================================
*/

const AuditLog = require("../models/AuditLog");

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

    }

    catch (error) {

        console.log("Audit Log Error:", error.message);

    }

};

module.exports = createAuditLog;