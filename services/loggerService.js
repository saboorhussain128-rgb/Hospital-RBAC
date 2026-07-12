/*
==================================================
LOGGER SERVICE
Hospital RBAC System
==================================================
*/

const fs = require("fs");
const path = require("path");

/* ==================================================
   WRITE LOG
================================================== */

const writeLog = (folder, file, message) => {

    try {

        const logFolder = path.join(

            __dirname,
            "..",
            "logs",
            folder

        );

        if (!fs.existsSync(logFolder)) {

            fs.mkdirSync(logFolder, {

                recursive: true

            });

        }

        const logFile = path.join(

            logFolder,
            file

        );

        const timestamp = new Date().toISOString();

        const logMessage =

`[${timestamp}] ${message}
`;

        fs.appendFileSync(

            logFile,
            logMessage

        );

    }

    catch (error) {

        console.log("Logger Error:", error.message);

    }

};

/* ==================================================
   AUDIT LOG
================================================== */

exports.audit = (file, message) => {

    writeLog(

        "audit",
        file,
        message

    );

};

/* ==================================================
   ERROR LOG
================================================== */

exports.error = (file, message) => {

    writeLog(

        "error",
        file,
        message

    );

};