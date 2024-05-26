
import OtpRepository from "./resetPassword.repository.js";
import { createVerificationToken } from "../../middleware/otpVerifyToken.js";


//------- a controller class for sending otp , verify otp and reset password
export default class OtpController{
    constructor(){
        this.otpRepository = new OtpRepository();
    }

    //------ send otp to email -------//
    async sendOtp(req,res,next){
        try{
            const {email} = req.body;
            if(!email){
                return res.status(404).json({success:false, msg:"Please provide email for reset password"});
            }

            const result = await this.otpRepository.sendOtp(email);
            if(!result.success){
                return res.status(404).json(result.msg);
            }

            const verificationToken=createVerificationToken(result.otpId);
            return res.status(200).cookie("verifyToken", verificationToken, { maxAge: 10 * 60 * 1000, httpOnly: true }).json(result.msg);

        }catch(error){
            console.log("sendOtp controller error: ", error);
            return res.status(404).json(error.message);
        }
    }


    //-------- verify opt for reset password conroller -------//
    async verifyOtp(req,res,next){
        try{
            const otpId= req.otpId;
            const otp = req.body.otp;
            if(!otp){
                return res.status(404).json({success:false, msg:"Please provide OTP for verify!"})
            }

          const verifyResuly= await this.otpRepository.verifyOtp(Number(otp), otpId);
          if(!verifyResuly.success){
            return res.status(404).json({success:false, msg:verifyResuly.msg})
          }

          return res.status(200).json(verifyResuly.msg);

        }catch(error){
            console.log("verify controller error: ", error);
            return res.status(404).json(error.message);
        }
    }

    //------- reset password --------//
    async resetPassword(req,res,next){
        try{
            const {newPassword, email} = req.body;
            const otpId = req.otpId;
            if(!newPassword || !email){
                return res.status(404).json({success:false, msg:"Please provide newpassword and email"});
            }

            const resetPasswordResult = await this.otpRepository.resetPassword(otpId, email, newPassword);
            
            if(!resetPasswordResult.success){

                
                return res.status(404).json({success:false, msg:resetPasswordResult.msg});

            }else{
                res.clearCookie('verifyToken')
                return res.status(200).json(resetPasswordResult);
            }


        }catch(error){
            console.log("reset password error: ", error);
            return res.status(404).json(error.message);
        }
    }
}