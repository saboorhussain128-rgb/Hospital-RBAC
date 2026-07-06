require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");

const app = express();

/* =====================================================
   DATABASE CONNECTION
===================================================== */

connectDB();

/* =====================================================
   MIDDLEWARES
===================================================== */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =====================================================
   COOKIE PARSER
===================================================== */

app.use(cookieParser());

/* =====================================================
   SESSION
===================================================== */

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 // 1 Hour
        }
    })
);

/* =====================================================
   JWT DECODER
===================================================== */

app.use((req, res, next) => {

    let token = null;

    /* ===============================================
       TOKEN FROM AUTHORIZATION HEADER
    =============================================== */

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {

        token = authHeader.split(" ")[1];

    }

    /* ===============================================
       TOKEN FROM COOKIE
    =============================================== */

    if (!token && req.cookies) {

        token = req.cookies.token;

    }

    /* ===============================================
       VERIFY JWT
    =============================================== */

    if (token) {

        try {

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;

        } catch (err) {

            console.log("JWT Error:", err.message);

        }

    }

    next();

});

/* =====================================================
   MAKE USER AVAILABLE TO EJS
===================================================== */

app.use((req, res, next) => {

    res.locals.user = req.session.user || req.user || null;

    next();

});

/* =====================================================
   STATIC FILES
===================================================== */

app.use(express.static(path.join(__dirname, "public")));

/* =====================================================
   VIEW ENGINE
===================================================== */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =====================================================
   HOME ROUTE
===================================================== */

app.get("/", (req, res) => {

    res.redirect("/platform/login");

});

/* =====================================================
   WEB ROUTES
===================================================== */

const platformRoutes = require("./routes/platformRoutes");
const hospitalAuthRoutes = require("./routes/hospitalAuthRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const hospitalAdminRoutes = require("./routes/hospitalAdminRoutes");

app.use("/platform", platformRoutes);
app.use("/hospital", hospitalAuthRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/platform", hospitalAdminRoutes);

/* =====================================================
   API ROUTES
===================================================== */

const authApiRoutes = require("./api/routes/authApiRoutes");
const hospitalApiRoutes = require("./api/routes/hospitalApiRoutes");
const hospitalAdminApiRoutes = require("./api/routes/hospitalAdminApiRoutes");

app.use("/api/auth", authApiRoutes);
app.use("/api/hospitals", hospitalApiRoutes);
app.use("/api/hospital-admins", hospitalAdminApiRoutes);

/* =====================================================
   SERVER
===================================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});