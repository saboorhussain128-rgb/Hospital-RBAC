require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

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
   SESSION (still needed for UI rendering + RBAC bridge)
   We will migrate gradually to JWT (not all at once)
===================================================== */

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 // 1 hour
        }
    })
);

/* =====================================================
   JWT AUTH MIDDLEWARE (GLOBAL OPTIONAL DECODER)
   - Reads token from cookie OR header
   - Attaches req.user if valid
===================================================== */

const jwt = require("jsonwebtoken");

app.use((req, res, next) => {
    const token =
        req.headers.authorization?.split(" ")[1] ||
        req.cookies?.token;

    if (!token) {
        return next(); // no token = guest access
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user globally
    } catch (err) {
        console.log("JWT Invalid:", err.message);
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
   HOME
===================================================== */

app.get("/", (req, res) => {
    res.redirect("/platform/login");
});

/* =====================================================
   ROUTES
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
   SERVER
===================================================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});