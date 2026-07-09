/*
==================================================
API JWT Authentication Middleware
Hospital RBAC System
==================================================
*/

const jwt = require("jsonwebtoken");

/* ==================================================
   AUTHENTICATE API REQUEST
================================================== */

exports.authenticate = (req, res, next) => {

    try {

        /* ==========================================
           GET AUTHORIZATION HEADER
        ========================================== */

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Authorization header is required."

            });

        }

        /* ==========================================
           CHECK BEARER TOKEN FORMAT
        ========================================== */

        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Invalid authorization format."

            });

        }

        /* ==========================================
           EXTRACT TOKEN
        ========================================== */

        const token = authHeader.split(" ")[1];

        /* ==========================================
           VERIFY JWT TOKEN
        ========================================== */

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        /* ==========================================
           STORE USER DETAILS
        ========================================== */

        req.user = decoded;

        /* ==========================================
           CONTINUE TO NEXT MIDDLEWARE
        ========================================== */

        next();

    }

    catch (error) {

        console.log("JWT Error:", error.message);

        return res.status(401).json({

            success: false,

            message: "Invalid or Expired Token."

        });

    }

};