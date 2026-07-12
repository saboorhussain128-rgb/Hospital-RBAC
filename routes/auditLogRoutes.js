/*
==================================================
AUDIT LOG ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");
const router = express.Router();

const auditLogController = require("../controllers/auditLogController");

const {
    isAuthenticated,
    isPlatformAdmin
} = require("../middleware/authMiddleware");

/* ==================================================
   VIEW AUDIT LOGS
================================================== */

router.get(

    "/audit-logs",

    isAuthenticated,

    isPlatformAdmin,

    auditLogController.viewLogs

);

module.exports = router;