const express = require("express");
const router = express.Router();

const hospitalController = require("../controllers/hospitalController");

// create page
router.get("/create-hospital", hospitalController.createPage);

// create hospital POST
router.post("/create-hospital", hospitalController.createHospital);

// view hospitals
router.get("/view-hospital", hospitalController.viewHospitals);

module.exports = router;