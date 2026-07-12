/*
==================================================
AUDIT LOG CONTROLLER
Hospital RBAC System
==================================================
*/

const AuditLog = require("../models/AuditLog");

/* ==================================================
   VIEW AUDIT LOGS
================================================== */

exports.viewLogs = async (req, res) => {

    try {

        const logs = await AuditLog.find()

            .sort({

                createdAt: -1

            });

        res.render("platform/viewAuditLogs", {

            logs

        });

    }

    catch (error) {

        console.log(error);

        res.send("Unable to load Audit Logs.");

    }

};