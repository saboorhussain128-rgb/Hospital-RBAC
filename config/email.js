/*
==================================================
EMAIL CONFIGURATION
Hospital RBAC System
==================================================
*/

const nodemailer = require("nodemailer");

/* ==================================================
   CREATE EMAIL TRANSPORTER
================================================== */

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_HOST,

    port: Number(process.env.EMAIL_PORT),

    secure: process.env.EMAIL_SECURE === "true",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

/* ==================================================
   VERIFY SMTP CONNECTION
================================================== */

const verifyEmailConnection = async () => {

    try {

        await transporter.verify();

        console.log("====================================");
        console.log("Email Server Connected Successfully");
        console.log("====================================");

    }

    catch (error) {

        console.log("====================================");
        console.log("Email Configuration Error");
        console.log(error.message);
        console.log("====================================");

    }

};

module.exports = {

    transporter,

    verifyEmailConnection

};