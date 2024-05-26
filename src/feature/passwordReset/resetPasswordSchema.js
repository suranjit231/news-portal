import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },

    status:{
        type:String,
        enum:["sending", "verified", "expired"]
    }

},{timestamps:true});


const otpModel = mongoose.model("Otp", otpSchema);
export default otpModel;