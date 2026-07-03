const jwt = require("jsonwebtoken");

/* =====================================================
   GENERATE JWT TOKEN
===================================================== */

exports.generateToken = (user) => {

    return jwt.sign(

        {

            id: user.id,

            role: user.role,

            hospital: user.hospital,

            hospitalName: user.hospitalName,

            name: user.name,

            permissions: user.permissions

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "24h"

        }

    );

};

/* =====================================================
   VERIFY JWT TOKEN
===================================================== */

exports.verifyToken = (token) => {

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

};