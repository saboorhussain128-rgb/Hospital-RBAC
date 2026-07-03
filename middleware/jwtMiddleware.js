const jwt = require("jsonwebtoken");

/* =====================================================
   VERIFY JWT
===================================================== */

exports.verifyJWT = (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {

            return res.redirect("/hospital/login");

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.user = decoded;

        next();

    }

    catch (err) {

        console.log(err);

        return res.redirect("/hospital/login");

    }

};