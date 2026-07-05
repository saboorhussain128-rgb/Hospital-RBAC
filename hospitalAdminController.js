[1mdiff --git a/controllers/hospitalAdminController.js b/controllers/hospitalAdminController.js[m
[1mindex 2d80724..31fd4ea 100644[m
[1m--- a/controllers/hospitalAdminController.js[m
[1m+++ b/controllers/hospitalAdminController.js[m
[36m@@ -1,152 +1,72 @@[m
 const HospitalAdmin = require("../models/HospitalAdmin");[m
 const Hospital = require("../models/Hospital");[m
 const bcrypt = require("bcryptjs");[m
[32m+[m[32mconst { validationResult } = require("express-validator");[m
 [m
 /* =====================================================[m
    CREATE PAGE[m
 ===================================================== */[m
 [m
 exports.createPage = async (req, res) => {[m
[32m+[m
     try {[m
 [m
         const hospitals = await Hospital.find().sort({ name: 1 });[m
 [m
         res.render("platform/createHospitalAdmin", {[m
[31m-            hospitals[m
[31m-        });[m
[31m-[m
[31m-    } catch (error) {[m
[31m-[m
[31m-        console.log(error);[m
[31m-        res.send("Error loading page.");[m
[31m-[m
[31m-    }[m
[31m-};[m
[31m-[m
[31m-/* =====================================================[m
[31m-   CREATE HOSPITAL ADMIN[m
[31m-===================================================== */[m
[31m-[m
[31m-exports.createAdmin = async (req, res) => {[m
[31m-[m
[31m-    try {[m
[31m-[m
[31m-        const {[m
[31m-            hospital,[m
[31m-            name,[m
[31m-            email,[m
[31m-            password[m
[31m-        } = req.body;[m
[31m-[m
[31m-        let permissions = req.body.permissions || [];[m
[31m-[m
[31m-        if (!Array.isArray(permissions)) {[m
[31m-            permissions = [permissions];[m
[31m-        }[m
[31m-[m
[31m-        if (permissions.length === 0) {[m
[31m-            return res.send("Please select at least one permission.");[m
[31m-        }[m
 [m
[31m-        const exists = await HospitalAdmin.findOne({ email });[m
[32m+[m[32m            hospitals,[m
 [m
[31m-        if (exists) {[m
[31m-            return res.send("Hospital Admin already exists.");[m
[31m-        }[m
[31m-[m
[31m-        const hashedPassword = await bcrypt.hash(password, 10);[m
[32m+[m[32m            errors: [],[m
 [m
[31m-        await HospitalAdmin.create({[m
[31m-[m
[31m-            hospital,[m
[31m-            name,[m
[31m-            email,[m
[31m-            password: hashedPassword,[m
[31m-            permissions[m
[32m+[m[32m            body: {}[m
 [m
         });[m
 [m
[31m-        res.redirect("/platform/view-hospital-admin");[m
[31m-[m
     } catch (error) {[m
 [m
         console.log(error);[m
[31m-        res.send("Error creating Hospital Admin.");[m
[31m-[m
[31m-    }[m
[31m-[m
[31m-};[m
[31m-[m
[31m-/* =====================================================[m
[31m-   VIEW ADMINS[m
[31m-===================================================== */[m
[31m-[m
[31m-exports.viewAdmins = async (req, res) => {[m
[31m-[m
[31m-    try {[m
[31m-[m
[31m-        const admins = await HospitalAdmin.find()[m
[31m-            .populate("hospital")[m
[31m-            .sort({ createdAt: -1 });[m
 [m
[31m-        res.render("platform/viewHospitalAdmin", {[m
[31m-            admins[m
[31m-        });[m
[31m-[m
[31m-    } catch (error) {[m
[31m-[m
[31m-        console.log(error);[m
[31m-        res.send("Error fetching admins.");[m
[32m+[m[32m        res.send("Error loading page.");[m
 [m
     }[m
 [m
 };[m
 [m
 /* =====================================================[m
[31m-   EDIT PAGE[m
[32m+[m[32m   CREATE HOSPITAL ADMIN[m
 ===================================================== */[m
 [m
[31m-exports.editPage = async (req, res) => {[m
[32m+[m[32mexports.createAdmin = async (req, res) => {[m
 [m
     try {[m
 [m
[31m-        const admin = await HospitalAdmin.findById(req.params.id);[m
[32m+[m[32m        const errors = validationResult(req);[m
 [m
         const hospitals = await Hospital.find().sort({ name: 1 });[m
 [m
[31m-        if (!admin) {[m
[31m-            return res.send("Hospital Admin not found.");[m
[31m-        }[m
[32m+[m[32m        if (!errors.isEmpty()) {[m
 [m
[31m-        res.render("platform/editHospitalAdmin", {[m
[32m+[m[32m            return res.render("platform/createHospitalAdmin", {[m
 [m
[31m-            admin,[m
[31m-            hospitals[m
[32m+[m[32m                hospitals,[m
 [m
[31m-        });[m
[32m+[m[32m                errors: errors.array(),[m
 [m
[31m-    } catch (error) {[m
[32m+[m[32m                body: req.body[m
 [m
[31m-        console.log(error);[m
[31m-        res.send("Error loading edit page.");[m
[32m+[m[32m            });[m
 [m
[31m-    }[m
[31m-[m
[31m-};[m
[31m-[m
[31m-/* =====================================================[m
[31m-   UPDATE ADMIN[m
[31m-===================================================== */[m
[31m-[m
[31m-exports.updateAdmin = async (req, res) => {[m
[31m-[m
[31m-    try {[m
[32m+[m[32m        }[m
 [m
         const {[m
 [m
             hospital,[m
[32m+[m
             name,[m
[32m+[m
             email,[m
[32m+[m
             password[m
 [m
         } = req.body;[m
[36m@@ -154,66 +74,66 @@[m [mexports.updateAdmin = async (req, res) => {[m
         let permissions = req.body.permissions || [];[m
 [m
         if (!Array.isArray(permissions)) {[m
[32m+[m
             permissions = [permissions];[m
[31m-        }[m
 [m
[31m-        if (permissions.length === 0) {[m
[31m-            return res.send("Please select at least one permission.");[m
         }[m
 [m
[31m-        const updateData = {[m
[32m+[m[32m        const exists = await HospitalAdmin.findOne({[m
 [m
[31m-            hospital,[m
[31m-            name,[m
[31m-            email,[m
[31m-            permissions[m
[32m+[m[32m            email[m
 [m
[31m-        };[m
[32m+[m[32m        });[m
 [m
[31m-        if (password && password.trim() !== "") {[m
[32m+[m[32m        if (exists) {[m
 [m
[31m-            updateData.password = await bcrypt.hash(password, 10);[m
[32m+[m[32m            return res.render("platform/createHospitalAdmin", {[m
 [m
[31m-        }[m
[32m+[m[32m                hospitals,[m
 [m
[31m-        await HospitalAdmin.findByIdAndUpdate([m
[32m+[m[32m                errors: [[m
 [m
[31m-            req.params.id,[m
[32m+[m[32m                    {[m
 [m
[31m-            updateData,[m
[32m+[m[32m                        msg: "Hospital Admin already exists."[m
 [m
[31m-            { new: true }[m
[32m+[m[32m                    }[m
 [m
[31m-        );[m
[32m+[m[32m                ],[m
 [m
[31m-        res.redirect("/platform/view-hospital-admin");[m
[32m+[m[32m                body: req.body[m
 [m
[31m-    } catch (error) {[m
[32m+[m[32m            });[m
 [m
[31m-        console.log(error);[m
[31m-        res.send("Error updating Hospital Admin.");[m
[32m+[m[32m        }[m
 [m
[31m-    }[m
[32m+[m[32m        const hashedPassword = await bcrypt.hash(password, 10);[m
 [m
[31m-};[m
[32m+[m[32m        await HospitalAdmin.create({[m
 [m
[31m-/* =====================================================[m
[31m-   DELETE ADMIN[m
[31m-===================================================== */[m
[32m+[m[32m            hospital,[m
 [m
[31m-exports.deleteAdmin = async (req, res) => {[m
[32m+[m[32m            name,[m
 [m
[31m-    try {[m
[32m+[m[32m            email,[m
[32m+[m
[32m+[m[32m            password: hashedPassword,[m
[32m+[m
[32m+[m[32m            permissions[m
 [m
[31m-        await HospitalAdmin.findByIdAndDelete(req.params.id);[m
[32m+[m[32m        });[m
 [m
         res.redirect("/platform/view-hospital-admin");[m
 [m
     } catch (error) {[m
 [m
         console.log(error);[m
[31m-        res.send("Error deleting Hospital Admin.");[m
[32m+[m
[32m+[m[32m        res.send("Error creating Hospital Admin.");[m
 [m
     }[m
 [m
[31m-};[m
\ No newline at end of file[m
[32m+[m[32m};[m
[32m+[m
[32m+[m[32m/* =====================================================[m
[32m+[m[32m   VIEW ADM[m
\ No newline at end of file[m
