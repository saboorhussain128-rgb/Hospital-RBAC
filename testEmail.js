require("dotenv").config();

const sendEmail = require("./utils/sendEmail");

(async () => {

    await sendEmail(

        process.env.EMAIL_USER,

        "Hospital RBAC Test Email",

        `
            <h2>Hospital RBAC System</h2>

            <p>This is a test email.</p>

            <p>Email service is working successfully.</p>
        `

    );

})();
