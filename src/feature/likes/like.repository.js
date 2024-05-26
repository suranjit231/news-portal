import mongoose from "mongoose";
import likeModel from "./likeSchema.js";
import userModel from "../users/userSchema.js";
import articleModel from "../articles/articleSchema.js"


//------- a class for contains methods for controlling like operation -----//
export default class LikeRepository{

    //------- toggle like (this methods toggle the like and unlike) ------//
    async toggleLike(userId, articleId){
        try{
            const user = await userModel.findById(userId);
            const article = await articleModel.findById(articleId);

            if(!user || !article){
                return {success:false, msg:"No user or no like is found!"}
            }

            //----- check existing likes of same user on same article
            const existingLike = await likeModel.findOne({article:articleId, user:userId});
            if(!existingLike){
                const newLike = new likeModel({user:userId, article:articleId});
                const savedLike = await newLike.save();

                article.likes.push(savedLike);
                await article.save();
                return {success:true, msg:"Like is added sucessfully!", savedLike};
            }else{
                //----- if there is any existing like of save user then delete this like ----//
                const deleteLike=await likeModel.deleteOne({_id:existingLike});
                if(deleteLike.deletedCount===0){
                    return {success:false, msg:"No user like is found!"}
                }else{
                    article.likes.pull(existingLike._id);
                    await article.save();
                    return {success:true, msg:"Like is removed sucessfully!"};
                }
            }

        }catch(error){
            console.log("toggle like repository error: ", error);
            throw error;
        }
    }

    //--------- get all likes in article -------//
    async getAllLike(articleId){
        try{
            const likes = await likeModel.find({article:articleId}).populate('user', 'username').populate("article", "title").sort({ createdAt: -1 });

            if(likes?.length<1){
                return {success:false, msg:"No likes found in the article!"};
            }

            return {success:true, msg:`Total ${likes.length} likes in this article.`, likes};

        }catch(error){
            console.log("get all likes repository error: ", error);
            throw error;
        }
    }

    //--------- get one like by like ID ---------//
    async getOneLike(likeId){
        try{
            const like = await likeModel.findById(likeId).populate('user', 'username').populate("article", "title");
            if(!like){
                return {success:false, msg:"No like found!"}
            }

            return {success:true, msg:"Like fetch sucessfully!", like};

        }catch(error){
            console.log("get one like repository error: ", error);
            throw error;
        }
    }


    
}