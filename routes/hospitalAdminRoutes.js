const express = require("express");
const router = express.Router();

const hospitalAdminController = require("../controllers/hospitalAdminController");

/* DEBUG (REMOVE LATER) */
console.log("hospitalAdminController loaded:", hospitalAdminController);

/* -------------------------
   CREATE HOSPITAL ADMIN PAGE
--------------------------*/
router.get(
    "/create-hospital-admin",
    hospitalAdminController.createPage
);

/* -------------------------
   CREATE HOSPITAL ADMIN
--------------------------*/
router.post(
    "/create-hospital-admin",
    hospitalAdminController.createAdmin
);

/* -------------------------
   VIEW HOSPITAL ADMINS
--------------------------*/
router.get(
    "/view-hospital-admin",
    hospitalAdminController.viewAdmins
);

/* -------------------------
   DELETE HOSPITAL ADMIN
--------------------------*/
router.get(
    "/delete-hospital-admin/:id",
    hospitalAdminController.deleteAdmin
);

module.exports = router;