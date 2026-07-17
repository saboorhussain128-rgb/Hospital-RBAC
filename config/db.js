/*
=====================================================
DATABASE CONFIGURATION
Hospital RBAC System
=====================================================
*/

const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        console.time("MongoDB Connection");

        const conn = await mongoose.connect(

            process.env.MONGO_URI,

            {

                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000

            }

        );

        console.timeEnd("MongoDB Connection");

        console.log("====================================");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("====================================");

    }

    catch (error) {

        console.log("====================================");
        console.log("MongoDB Connection Failed");
        console.log(error.message);
        console.log("====================================");

        process.exit(1);

    }

};

module.exports = connectDB;