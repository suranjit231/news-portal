import mongoose from "mongoose";

//------- schema for comments --------//
const commentSchema = new mongoose.Schema({
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Article"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        required:[true, "comment content is required"]
    },

},{timestamps:true});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;