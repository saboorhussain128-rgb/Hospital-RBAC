/*
==================================================
EMAIL API CONTROLLER
Hospital RBAC System
==================================================
*/

const { sendEmail } = require("../../services/emailService");
const apiResponse = require("../utils/apiResponse");

/* ==================================================
   SEND TEST EMAIL
================================================== */

exports.sendTestEmail = async (req, res) => {

    try {

        const { email } = req.body;

        await sendEmail({

            to: email,

            subject: "Hospital RBAC - Test Email",

            text:
`Hello,

This is a test email from your Hospital RBAC project.

Congratulations!

Your email integration is working successfully.

Regards,
Hospital RBAC Team`

        });

        return apiResponse.success(

            res,

            "Test email sent successfully."

        );

    }

    catch (error) {

        return apiResponse.error(

            res,

            "Unable to send email.",

            500

        );

    }

};