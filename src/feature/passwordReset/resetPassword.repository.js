import mongoose from "mongoose";
import otpModel from "./resetPasswordSchema.js";
import userModel from "../users/userSchema.js";
import otpGenerator from "otp-generator";
import { sendOtpMail } from "../../utility/sendSubscriptionMail.js";
import { hashedPassword } from "../../utility/hashedPassword.js";

//---------- a class containes methods for sending otp verified otp and reset-password
export default class OtpRepository{

    //-------sending otp to for password-reset
    async sendOtp(email){
        try{
            const user = await userModel.findOne({email:email});
            if(!user){
                return {success:false, msg:"Invalid email, no account find with this email"};
            }
            const otp= otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
            const existingOtp = await otpModel.findOne({user:user._id});
            if(!existingOtp){
                const newOtpDocs = new otpModel({
                    user:user._id,
                    otp:otp,
                    status:"sending",
                });
                const savedOtp = await newOtpDocs.save();
                return {success:true, msg:"An OTP is sends to your register email please verify the OTP", otpId:savedOtp._id};
            }

            existingOtp.otp=otp;
            await existingOtp.save();
            const otpSend=await sendOtpMail(user, otp);
            return {success:true, msg:"An OTP is sends to your register email please verify the OTP", otpId:existingOtp._id};

        }catch(error){
            console.log("send otp repository error: ", error);
            throw error;
        }
    }


    //------ verify otp -------//
    async verifyOtp(otp, otpId){
        try{
            const otpDocs = await otpModel.findById(otpId);
            if(!otpDocs){
                return {success:false, msg:"No OTP founds, please resend OTP!"}
            }


            if(otpDocs.otp === otp){
                otpDocs.status="verified";
               await otpDocs.save();
               return {success:true, msg:"Your OTP verified successfully!"}
            }else{
                return {success:false, msg:"Invalid OTP! OTP not matched"}
            }

        }catch(error){
            console.log("verify otp repository error: ", error);
            throw error;
        }

    }


    //------- reset password repository --------//
    async resetPassword(otpId, email, newPassword){
        try{
            const otpDocs = await otpModel.findById(otpId);
            if(!otpDocs){
                return {success:false, msg:"Please verify your email for reset password!"}
            }

            const now = new Date();
            const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

            //----- checking is the otp is verified and is not it expired then
            if(otpDocs.status==="verified" && otpDocs.updatedAt >= tenMinutesAgo){
                const user = await userModel.findOne({_id:otpDocs.user, email:email});

                if(!user){
                    return { success: false, msg: "Invalid email, no account found with this email" };
                }

                const passwordHashed = await hashedPassword(newPassword);
                user.password = passwordHashed; 
                await user.save();

                await otpModel.findByIdAndDelete(otpId);
                return { success: true, msg: "Password reset successfully!" }


            }else {
                return { success: false, msg: "OTP is not verified or has expired!" }
            }

        }catch(error){
            console.log("verify otp repository error: ", error);
            throw error;
        }
    }
}