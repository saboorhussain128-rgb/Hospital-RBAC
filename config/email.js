/*
==================================================
EMAIL CONFIGURATION
Hospital RBAC System
==================================================
*/

const nodemailer = require("nodemailer");

/* ==================================================
   EMAIL TRANSPORTER
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
   VERIFY EMAIL CONNECTION
================================================== */

const verifyEmailConnection = async () => {

    try {

        console.time("SMTP Verification");

        await transporter.verify();

        console.timeEnd("SMTP Verification");

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