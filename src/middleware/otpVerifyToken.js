import jwt from "jsonwebtoken";



 //---- create a token for verify the OTP   
export function createVerificationToken(otpId){
    const token = jwt.sign(
        {otpId:otpId},
        process.env.JWT_SECRET,
        { expiresIn: '10m' }
    )
    
    return token;
}


//.. verificaton the OTP token
export const verifyToken = async (req,res,next)=>{
    const {verifyToken} = req.cookies

    jwt.verify(verifyToken, process.env.JWT_SECRET, (err, data)=>{
        if(err){
            return res.status(400).send("Please resend OTP! OTP is expired")
        }else{
            req.otpId = data.otpId;
            next();
        }
    })
}