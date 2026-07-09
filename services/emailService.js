/*
==================================================
EMAIL SERVICE
Hospital RBAC System
==================================================
*/

const { transporter } = require("../config/email");

/* ==================================================
   GENERIC EMAIL SENDER
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

/* ==================================================
   WELCOME EMAIL
================================================== */

const sendWelcomeEmail = async ({

    hospitalName,

    name,

    email,

    password

}) => {

    const subject = "Welcome to Hospital RBAC";

    const text =
`Hello ${name},

Welcome to Hospital RBAC.

Your Hospital Admin account has been created successfully.

Hospital
${hospitalName}

Login Email
${email}

Temporary Password
${password}

Login URL
http://localhost:3000/hospital/login

Please change your password after your first login.

Regards,
Hospital RBAC Team`;

    return sendEmail({

        to: email,

        subject,

        text

    });

};

/* ==================================================
   FORGOT PASSWORD EMAIL
================================================== */

const sendForgotPasswordEmail = async ({

    email,

    resetLink

}) => {

    const subject = "Hospital RBAC Password Reset";

    const text =
`Hello,

A request has been received to reset your password.

Click the link below.

${resetLink}

If you didn't request this, simply ignore this email.

Regards,
Hospital RBAC Team`;

    return sendEmail({

        to: email,

        subject,

        text

    });

};

/* ==================================================
   OTP EMAIL
================================================== */

const sendOTPEmail = async ({

    email,

    otp

}) => {

    const subject = "Hospital RBAC OTP Verification";

    const text =
`Hello,

Your OTP Code is

${otp}

This OTP will expire in 10 minutes.

Regards,
Hospital RBAC Team`;

    return sendEmail({

        to: email,

        subject,

        text

    });

};

module.exports = {

    sendEmail,

    sendWelcomeEmail,

    sendForgotPasswordEmail,

    sendOTPEmail

};