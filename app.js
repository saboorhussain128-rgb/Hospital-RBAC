require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const connectDB = require("./config/db");

const app = express(); // ⭐ THIS MUST COME BEFORE app.get()

/* -------------------------
   DB CONNECTION
--------------------------*/
connectDB();

/* -------------------------
   MIDDLEWARES
--------------------------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60
        }
    })
);

/* -------------------------
   STATIC FILES
--------------------------*/
app.use(express.static(path.join(__dirname, "public")));

/* -------------------------
   VIEW ENGINE
--------------------------*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* -------------------------
   ROUTES
--------------------------*/

// HOME → Platform login
app.get("/", (req, res) => {
    res.redirect("/platform/login");
});

/* -------------------------
   PLATFORM ROUTES
--------------------------*/
const platformRoutes = require("./routes/platformRoutes");
app.use("/platform", platformRoutes);

/* -------------------------
   HOSPITAL AUTH ROUTES
--------------------------*/
const hospitalAuthRoutes = require("./routes/hospitalAuthRoutes");
app.use("/hospital", hospitalAuthRoutes);

/* -------------------------
   HOSPITAL FEATURES ROUTES
--------------------------*/
const hospitalRoutes = require("./routes/hospitalRoutes");
app.use("/hospital", hospitalRoutes);

/* -------------------------
   PLATFORM HOSPITAL ADMIN ROUTES
--------------------------*/
const hospitalAdminRoutes = require("./routes/hospitalAdminRoutes");
app.use("/platform", hospitalAdminRoutes);

/* -------------------------
   SERVER START
--------------------------*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});