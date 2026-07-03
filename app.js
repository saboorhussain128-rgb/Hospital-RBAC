require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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
   (Keep this until JWT migration is completed)
===================================================== */

app.use(

    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            secure: false,

            httpOnly: true,

            maxAge: 1000 * 60 * 60

        }

    })

);

/* =====================================================
   MAKE SESSION AVAILABLE TO ALL EJS FILES
===================================================== */

app.use((req, res, next) => {

    res.locals.session = req.session;

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
   HOME
===================================================== */

app.get("/", (req, res) => {

    res.redirect("/platform/login");

});

/* =====================================================
   PLATFORM ROUTES
===================================================== */

const platformRoutes = require("./routes/platformRoutes");

app.use("/platform", platformRoutes);

/* =====================================================
   HOSPITAL LOGIN ROUTES
===================================================== */

const hospitalAuthRoutes = require("./routes/hospitalAuthRoutes");

app.use("/hospital", hospitalAuthRoutes);

/* =====================================================
   HOSPITAL ROUTES
===================================================== */

const hospitalRoutes = require("./routes/hospitalRoutes");

app.use("/hospital", hospitalRoutes);

/* =====================================================
   HOSPITAL ADMIN ROUTES
===================================================== */

const hospitalAdminRoutes = require("./routes/hospitalAdminRoutes");

app.use("/platform", hospitalAdminRoutes);

/* =====================================================
   SERVER
===================================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});