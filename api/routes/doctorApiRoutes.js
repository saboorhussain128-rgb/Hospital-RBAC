/*
==================================================
DOCTOR API ROUTES
Hospital RBAC System
==================================================
*/

const express = require("express");

const router = express.Router();

/*
==================================================
IMPORT CONTROLLER
==================================================
*/

const doctorController = require("../controllers/doctorController");

/*
==================================================
IMPORT AUTH MIDDLEWARE
==================================================
*/

const {
    authenticate
} = require("../middleware/apiAuth");

/*
==================================================
IMPORT RBAC MIDDLEWARE
==================================================
*/

const checkPermission = require("../middleware/checkPermission");

/*
==================================================
CREATE DOCTOR

POST
/api/doctors
==================================================
*/

router.post(

    "/",

    authenticate,

    checkPermission("create_doctor"),

    doctorController.createDoctor

);

/*
==================================================
VIEW ALL DOCTORS

GET
/api/doctors
==================================================
*/

router.get(

    "/",

    authenticate,

    checkPermission("view_doctor"),

    doctorController.viewDoctors

);

/*
==================================================
VIEW SINGLE DOCTOR

GET
/api/doctors/:id
==================================================
*/

router.get(

    "/:id",

    authenticate,

    checkPermission("view_doctor"),

    doctorController.getDoctor

);

/*
==================================================
UPDATE DOCTOR

PUT
/api/doctors/:id
==================================================
*/

router.put(

    "/:id",

    authenticate,

    checkPermission("edit_doctor"),

    doctorController.updateDoctor

);

/*
==================================================
DELETE DOCTOR

DELETE
/api/doctors/:id
==================================================
*/

router.delete(

    "/:id",

    authenticate,

    checkPermission("delete_doctor"),

    doctorController.deleteDoctor

);

/*
==================================================
EXPORT ROUTER
==================================================
*/

module.exports = router;