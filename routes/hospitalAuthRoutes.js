const express = require("express");
const router = express.Router();

const hospitalController = require("../controllers/hospitalController");

/* -------------------------
   HOSPITAL ADMIN LOGIN
--------------------------*/
router.get("/login", hospitalController.loginPage);
router.post("/login", hospitalController.login);

/* -------------------------
   HOSPITAL DASHBOARD
--------------------------*/
router.get("/dashboard", hospitalController.dashboard);

/* -------------------------
   HOSPITAL LOGOUT
--------------------------*/
router.get("/logout", hospitalController.logout);

module.exports = router;