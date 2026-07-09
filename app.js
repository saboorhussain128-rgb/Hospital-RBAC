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
CREATE APP
=====================================================
*/

const app = express();

/*
=====================================================
DATABASE CONNECTION
=====================================================
*/

connectDB();

verifyEmailConnection();

/*
=====================================================
GLOBAL MIDDLEWARES
=====================================================
*/

app.use(express.urlencoded({ 
    extended: true 
}));

app.use(express.json());

/*
=====================================================
COOKIE PARSER
=====================================================
*/

app.use(cookieParser());

/*
=====================================================
SESSION CONFIGURATION
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
JWT AUTHENTICATION MIDDLEWARE
=====================================================
*/

app.use((req, res, next)=>{

    let token = null;

    /*
    ================================================
    CHECK AUTHORIZATION HEADER
    ================================================
    */

    const authHeader = req.headers.authorization;

    if(
        authHeader &&
        authHeader.startsWith("Bearer ")
    ){

        token = authHeader.split(" ")[1];

    }

    /*
    ================================================
    CHECK COOKIE TOKEN
    ================================================
    */

    if(!token && req.cookies){

        token = req.cookies.token;

    }

    /*
    ================================================
    VERIFY TOKEN
    ================================================
    */

    if(token){

        try{


            const decoded = jwt.verify(

                token,

                process.env.JWT_SECRET

            );


            req.user = decoded;



        }
        catch(error){


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
MAKE USER AVAILABLE IN ALL EJS FILES
=====================================================
*/

app.use((req,res,next)=>{


    res.locals.user = 

        req.session.user || 
        req.user || 
        null;


    next();


});





/*
=====================================================
STATIC FILES
=====================================================
*/

app.use(

    express.static(

        path.join(
            __dirname,
            "public"
        )

    )

);





/*
=====================================================
VIEW ENGINE
=====================================================
*/

app.set(

    "view engine",
    "ejs"

);


app.set(

    "views",

    path.join(
        __dirname,
        "views"
    )

);

/*
=====================================================
HOME ROUTE
=====================================================
*/

app.get("/",(req,res)=>{


    res.redirect(
        "/platform/login"
    );


});

/*
=====================================================
WEB ROUTES
=====================================================
*/


const platformRoutes = require("./routes/platformRoutes");

const hospitalAuthRoutes = require("./routes/hospitalAuthRoutes");

const hospitalRoutes = require("./routes/hospitalRoutes");

const hospitalAdminRoutes = require("./routes/hospitalAdminRoutes");

app.use(

    "/platform",

    platformRoutes

);

app.use(

    "/hospital",

    hospitalAuthRoutes

);

app.use(

    "/hospital",

    hospitalRoutes

);

app.use(

    "/platform",

    hospitalAdminRoutes

);

/*
=====================================================
API ROUTES
=====================================================
*/

const authApiRoutes = require("./api/routes/authApiRoutes");

const hospitalApiRoutes = require("./api/routes/hospitalApiRoutes");

const hospitalAdminApiRoutes = require("./api/routes/hospitalAdminApiRoutes");

const doctorApiRoutes = require("./api/routes/doctorApiRoutes");

const emailApiRoutes = require("./api/routes/emailApiRoutes");

/*
AUTHENTICATION API

POST
/api/auth/platform-login

POST
/api/auth/hospital-login

GET
/api/auth/profile

POST
/api/auth/forgot-password

POST
/api/auth/reset-password

POST
/api/auth/logout
*/

app.use(

    "/api/auth",

    authApiRoutes

);

app.use(

    "/api/hospitals",

    hospitalApiRoutes

);

app.use(

    "/api/hospital-admins",

    hospitalAdminApiRoutes

);

app.use(

    "/api/doctors",

    doctorApiRoutes

);

app.use(

    "/api/email",

    emailApiRoutes

);

/*
=====================================================
404 HANDLER
=====================================================
*/

app.use((req,res)=>{


    res.status(404).json({

        success:false,

        message:"Route Not Found"

    });


});

/*
=====================================================
SERVER START
=====================================================
*/

const PORT = process.env.PORT || 3000;
app.listen(

    PORT,

    ()=>{


        console.log(

            `Server Running on Port ${PORT}`

        );


    }

);