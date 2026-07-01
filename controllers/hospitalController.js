const Hospital = require("../models/Hospital");

/* -----------------------
   CREATE PAGE
------------------------*/
exports.createPage = (req, res) => {
    res.render("platform/createHospital");
};

/* -----------------------
   CREATE HOSPITAL (POST)
------------------------*/
exports.createHospital = async (req, res) => {
    try {
        const { name, address, status } = req.body;

        await Hospital.create({
            name,
            address,
            status
        });

        res.redirect("/platform/view-hospital");

    } catch (error) {
        console.log(error);
        res.send("Error creating hospital");
    }
};

/* -----------------------
   VIEW HOSPITALS
------------------------*/
exports.viewHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.render("platform/viewHospital", { hospitals });

    } catch (error) {
        console.log(error);
        res.send("Error fetching hospitals");
    }
};