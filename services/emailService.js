/*
==================================================
EMAIL SERVICE
Hospital RBAC System
==================================================
*/


const { transporter } = require("../config/email");



/*
==================================================
GENERIC EMAIL SENDER
==================================================
*/


const sendEmail = async (options)=>{


    try{


        const info = await transporter.sendMail({


            from: process.env.EMAIL_FROM,


            to: options.to,


            subject: options.subject,


            text: options.text



        });



        console.log("====================================");
        console.log("Email Sent Successfully");
        console.log("To :", options.to);
        console.log("Message ID :", info.messageId);
        console.log("====================================");



        return info;



    }
    catch(error){


        console.log("====================================");
        console.log("Email Sending Failed");
        console.log(error.message);
        console.log("====================================");



        throw error;


    }


};







/*
==================================================
WELCOME EMAIL
==================================================
*/


const sendWelcomeEmail = async({

    hospitalName,

    name,

    email,

    password


})=>{


    return sendEmail({


        to:email,


        subject:"Welcome to Hospital RBAC",


        text:

`Hello ${name},


Welcome to Hospital RBAC.


Your Hospital Administrator account has been created successfully.



Hospital:

${hospitalName}



Login Email:

${email}



Temporary Password:

${password}



Login URL:

http://localhost:3000/hospital/login



Please login and change your password immediately.



Regards,

Hospital RBAC Team`


    });


};









/*
==================================================
FORGOT PASSWORD EMAIL
==================================================
*/


const sendForgotPasswordEmail = async({


    name="User",


    email,


    resetLink



})=>{


    return sendEmail({


        to:email,


        subject:"Hospital RBAC Password Reset",


        text:


`Hello ${name},


A password reset request has been received for your Hospital RBAC account.



Click the link below to reset your password:



${resetLink}



This password reset link will expire in 15 minutes.



If you did not request this password reset, please ignore this email.



Regards,

Hospital RBAC Team`



    });



};









/*
==================================================
OTP EMAIL
==================================================
*/


const sendOTPEmail = async({


    name,

    email,

    otp



})=>{


    return sendEmail({


        to:email,


        subject:"Hospital RBAC OTP Verification",


        text:


`Hello ${name},


Your OTP verification code is:


${otp}



This OTP expires in 10 minutes.



Regards,

Hospital RBAC Team`



    });


};









/*
==================================================
PASSWORD CHANGED EMAIL
==================================================
*/


const sendPasswordChangedEmail = async({


    name,

    email



})=>{


    return sendEmail({


        to:email,


        subject:"Hospital RBAC Password Changed",


        text:


`Hello ${name},


Your Hospital RBAC password has been changed successfully.



If you did not perform this action, contact your administrator immediately.



Regards,

Hospital RBAC Team`



    });



};






module.exports = {


    sendEmail,


    sendWelcomeEmail,


    sendForgotPasswordEmail,


    sendOTPEmail,


    sendPasswordChangedEmail


};