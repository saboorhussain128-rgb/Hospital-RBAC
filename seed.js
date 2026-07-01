require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PlatformAdmin = require("./models/PlatformAdmin");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

const seedAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        await PlatformAdmin.create({
            email: "admin@hospital.com",
            password: hashedPassword
        });

        console.log("Admin Created Successfully");

        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAdmin();