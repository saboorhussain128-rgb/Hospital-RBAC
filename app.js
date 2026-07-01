require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const connectDB = require("./config/db");

// Routes
const platformRoutes = require("./routes/platformRoutes");

const app = express();

/* -------------------------
   DATABASE CONNECTION
--------------------------*/
connectDB();

/* -------------------------
   MIDDLEWARES
--------------------------*/

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mySecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // keep false for development (HTTP)
            maxAge: 1000 * 60 * 60 // 1 hour
        }
    })
);

/* -------------------------
   STATIC FILES
--------------------------*/
app.use(express.static(path.join(__dirname, "public")));

/* -------------------------
   VIEW ENGINE (EJS)
--------------------------*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* -------------------------
   ROUTES
--------------------------*/

// Default route → redirect to platform login
app.get("/", (req, res) => {
    res.redirect("/platform/login");
});

// Platform Routes
app.use("/platform", platformRoutes);

/* -------------------------
   START SERVER
--------------------------*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});