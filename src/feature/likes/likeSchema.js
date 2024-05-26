import mongoose from "mongoose";


//------ schema for likes ---------//
const likeSchema = new mongoose.Schema({
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const likeModel = mongoose.model("Like", likeSchema);
export default likeModel;