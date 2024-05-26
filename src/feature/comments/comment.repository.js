import mongoose from "mongoose";
import commentModel from "./commentSchema.js";
import articleModel from "../articles/articleSchema.js";
import userModel from "../users/userSchema.js";

//------ a class contains all the comments operation -------//
export default class CommentRepository{

    //------ post comment methods -------//
    async postComment(userId, articleId, content){
        try{
            const article = await articleModel.findById(articleId);
            const user = await userModel.findById(userId);

            if (!article || !user) {
                return {success:false, msg:"Article or User not found!"}
            }

            //------ check existing comments of user in same article-------//
            const existingComment = await commentModel.findOne({article:articleId, user:userId});
            if(!existingComment){
                const newComment = new commentModel({user:userId, article:articleId, content:content});
                const savedComment = await newComment.save();
                article.comments.push(savedComment._id);
                await article.save();

                return {success:true, msg:"Comment is added sucessfully!", savedComment};
            }

            existingComment.content = content;
            const savedExistingComment = await existingComment.save();
            return {success:true, msg:"Comment is updated sucessfully!", savedExistingComment};

        }catch(error){
            console.log("post comment repository error: ", error);
            throw error;
        }
    }


    //------- update comments on article ---------//
    async updateComment(userId, commentId, content){
        try{
            const commentDocs = await commentModel.findById(commentId);

            if(commentDocs.user.toString() !== userId.toString()){
                return { success: false, msg: "Can't update comment; you are not authorized to update comment!" };
            }else{

                commentDocs.content = content;
                const updatedComment = await commentDocs.save();
                return {success:true, msg:"Comment is updated!", updatedComment};
            }


        }catch(error){
            console.log("update comment repository error: ", error);
            throw error;
        }
    }


    //------- delete a comment --------//
    async deleteComment(userId, commentId){
        try{
            const commentDocs = await commentModel.findById(commentId);
            if (!commentDocs) {
                return { success: false, msg: "Comment not found" };
            }
           
            if(commentDocs.user.toString() !== userId.toString()){
                return { success: false, msg: "Can't delete comment; you are not authorized to delete the comment!" };
            }

             // Find the article containing the comment
            const article = await articleModel.findOne({ comments: commentId });
            if (!article) {
                return { success: false, msg: "Article not found!" };
            }

           const deleteResult=await commentModel.deleteOne({_id:commentId, user:userId});
           if (deleteResult.deletedCount === 0) {
            return { success: false, msg: "Failed to delete comment!" };
         }

         // Remove the comment ID from the article comments array
        article.comments.pull(commentId);
        await article.save();

        return { success: true, msg: "Comment deleted successfully!" };


        }catch(error){
            console.log("update comment repository error: ", error);
            throw error;
        }
    }


    //------- get all comments on article ------//
    async getAllCommentsByArticle(articleId){
        try{
            const comments = await commentModel.find({article:articleId}).populate('user', 'username').sort({ createdAt: -1 });
            if(comments?.length<1){
                return {success:false, msg:"no comments found in this article!"}
            }

            return {success:true, msg:`Total ${comments.length} comments found!`, comments};

        }catch(error){
            console.log("update comment repository error: ", error);
            throw error;
        }
    }


     //------- get comments by id ------//
     async getOneCommentsById(commentId){
        try{
            const comment = await commentModel.findOne({_id:commentId}).populate('user', 'username');
            if(!comment){
                return {success:false, msg:"no comments is found!"}
            }

            return {success:true, msg:"comments found!" , comment};

        }catch(error){
            console.log("update comment repository error: ", error);
            throw error;
        }
    }
}