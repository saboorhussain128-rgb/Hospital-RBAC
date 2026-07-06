/*
==================================================
EMAIL UTILITY
Hospital RBAC System
==================================================
*/

const nodemailer = require("nodemailer");

/* ==================================================
   CREATE TRANSPORTER
================================================== */

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

/* ==================================================
   SEND EMAIL FUNCTION
================================================== */

const sendEmail = async (

    to,

    subject,

    html

) => {

    try {

        await transporter.sendMail({

            from: `"Hospital RBAC System" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            html

        });

        console.log("======================================");

        console.log("Email Sent Successfully");

        console.log("To :", to);

        console.log("======================================");

    }

    catch (error) {

        console.log("======================================");

        console.log("EMAIL ERROR");

        console.log(error);

        console.log("======================================");

    }

};

module.exports = sendEmail;