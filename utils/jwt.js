const jwt = require("jsonwebtoken");

/* =====================================================
   GENERATE JWT TOKEN
===================================================== */

exports.generateToken = (payload) => {

    return jwt.sign(

        payload,

        process.env.JWT_SECRET,

        {
            expiresIn: "1d"
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