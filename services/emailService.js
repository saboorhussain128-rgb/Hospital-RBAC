/*
==================================================
EMAIL SERVICE
Hospital RBAC System
==================================================
*/

const { transporter } = require("../config/email");

/* ==================================================
   SEND EMAIL
================================================== */

const sendEmail = async ({ to, subject, text }) => {

    try {

        const info = await transporter.sendMail({

            from: process.env.EMAIL_FROM,

            to,

            subject,

            text

        });

        console.log("====================================");
        console.log("Email Sent Successfully");
        console.log("Message ID:", info.messageId);
        console.log("====================================");

        return info;

    }

    catch (error) {

        console.log("====================================");
        console.log("Email Sending Failed");
        console.log(error.message);
        console.log("====================================");

        throw error;

    }

};

module.exports = {

    sendEmail

};