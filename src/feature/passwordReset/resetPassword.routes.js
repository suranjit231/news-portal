import express from "express";
import OtpController from "./resetPassword.controller.js";
import { verifyToken } from "../../middleware/otpVerifyToken.js";

const otpRoutes = express.Router();
const otpController = new OtpController();

//-------- routes related to the users password-reset

//------- sendOtp routes ------//
otpRoutes.post("/sendOtp", (req,res,next)=>{
    otpController.sendOtp(req,res,next);
});

//------- verifyOTP routes ------//
otpRoutes.post("/verifyOtp",verifyToken, (req,res,next)=>{
    otpController.verifyOtp(req,res,next);
});

//------- reset password routes ---//
otpRoutes.post("/updatePassword", verifyToken, (req,res,next)=>{
    otpController.resetPassword(req,res,next);
})





export default otpRoutes;