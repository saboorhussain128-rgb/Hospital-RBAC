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

const sendEmail = async (options) => {

    try {

        const info = await transporter.sendMail({

            from: process.env.EMAIL_FROM,

            to: options.to,

            subject: options.subject,

            text: options.text

        });

        console.log("====================================");
        console.log("Email Sent Successfully");
        console.log("Message ID :", info.messageId);
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

Your Hospital Administrator account has been created successfully.

------------------------------------------------

Hospital

${hospitalName}

------------------------------------------------

Login Email

${email}

------------------------------------------------

Temporary Password

${password}

------------------------------------------------

Login URL

http://localhost:3000/hospital/login

------------------------------------------------

Please login and change your password immediately.

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

    name,

    email,

    resetLink

}) => {

    const subject = "Hospital RBAC Password Reset";

    const text =
`Hello ${name},

A password reset request has been received for your account.

Click the link below to reset your password.

${resetLink}

This link will expire in 15 minutes.

If you did not request this password reset,

please ignore this email.

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

    name,

    email,

    otp

}) => {

    const subject = "Hospital RBAC OTP Verification";

    const text =
`Hello ${name},

Your One Time Password (OTP) is

${otp}

This OTP is valid for 10 minutes.

Regards,

Hospital RBAC Team`;

    return sendEmail({

        to: email,

        subject,

        text

    });

};

/* ==================================================
   PASSWORD CHANGED EMAIL
================================================== */

const sendPasswordChangedEmail = async ({

    name,

    email

}) => {

    const subject = "Hospital RBAC Password Changed";

    const text =
`Hello ${name},

Your password has been changed successfully.

If you did not perform this action,

please contact the Platform Administrator immediately.

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

    sendOTPEmail,

    sendPasswordChangedEmail

};