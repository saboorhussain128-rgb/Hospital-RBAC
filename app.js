/*
=====================================================
HOSPITAL RBAC SYSTEM
MAIN SERVER FILE
=====================================================
*/

require("dotenv").config();

/*
=====================================================
IMPORT PACKAGES
=====================================================
*/

const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

/*
=====================================================
IMPORT CONFIG
=====================================================
*/

const connectDB = require("./config/db");
const { verifyEmailConnection } = require("./config/email");

/*
=====================================================
IMPORT WEB ROUTES
=====================================================
*/

const platformRoutes = require("./routes/platformRoutes");
const hospitalAuthRoutes = require("./routes/hospitalAuthRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const hospitalAdminRoutes = require("./routes/hospitalAdminRoutes");

/*
=====================================================
IMPORT API ROUTES
=====================================================
*/

const authApiRoutes = require("./api/routes/authApiRoutes");
const hospitalApiRoutes = require("./api/routes/hospitalApiRoutes");
const hospitalAdminApiRoutes = require("./api/routes/hospitalAdminApiRoutes");
const doctorApiRoutes = require("./api/routes/doctorApiRoutes");
const emailApiRoutes = require("./api/routes/emailApiRoutes");

/*
=====================================================
CREATE EXPRESS APP
=====================================================
*/

const app = express();

/*
=====================================================
CONNECT DATABASE
=====================================================
*/

connectDB();

/*
=====================================================
VERIFY EMAIL CONNECTION
=====================================================
*/

verifyEmailConnection();

/*
=====================================================
BODY PARSER
=====================================================
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
=====================================================
COOKIE PARSER
=====================================================
*/

app.use(cookieParser());

/*
=====================================================
SESSION
=====================================================
*/

app.use(

    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            secure: false,

            maxAge: 1000 * 60 * 60

        }

    })

);

/*
=====================================================
JWT MIDDLEWARE
=====================================================
*/

app.use((req, res, next) => {

    let token = null;

    const authHeader = req.headers.authorization;

    if (
        authHeader &&
        authHeader.startsWith("Bearer ")
    ) {

        token = authHeader.split(" ")[1];

    }

    if (!token && req.cookies) {

        token = req.cookies.token;

    }

    if (token) {

        try {

            req.user = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        }

        catch (error) {

            console.log(
                "JWT Verification Failed:",
                error.message
            );

        }

    }

    next();

});

/*
=====================================================
MAKE USER AVAILABLE TO EJS
=====================================================
*/

app.use((req, res, next) => {

    res.locals.user = req.session.user || req.user || null;

    next();

});

/*
=====================================================
STATIC FILES
=====================================================
*/

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

/*
=====================================================
VIEW ENGINE
=====================================================
*/

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

/*
=====================================================
HOME
=====================================================
*/

app.get("/", (req, res) => {

    res.redirect("/platform/login");

});

/*
=====================================================
WEB ROUTES
=====================================================
*/

app.use("/platform", platformRoutes);

app.use("/hospital", hospitalAuthRoutes);

app.use("/hospital", hospitalRoutes);

app.use("/platform", hospitalAdminRoutes);

/*
=====================================================
API ROUTES
=====================================================
*/

app.use("/api/auth", authApiRoutes);

app.use("/api/hospitals", hospitalApiRoutes);

app.use("/api/hospital-admins", hospitalAdminApiRoutes);

app.use("/api/doctors", doctorApiRoutes);

app.use("/api/email", emailApiRoutes);

/*
=====================================================
404 ROUTE
=====================================================
*/

app.use((req, res) => {

    return res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

/*
=====================================================
SERVER
=====================================================
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("========================================");
    console.log(`🚀 Server Running on Port ${PORT}`);
    console.log("========================================");

});