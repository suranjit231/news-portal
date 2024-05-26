import LikeRepository from "./like.repository.js";

//----- a class contains methods for controlling like and unlike operation ----//
export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    //----- methods for toggle like controller -----//
    async toggleLike(req,res,next){
        try{
            const userId = req.userId;
            const articleId = req.query.articleId;

            if(!articleId){
                return res.status(404).json({success:false, msg:"error! article Id is required in request query params!"})
            }

            const result = await this.likeRepository.toggleLike(userId, articleId);
            if(!result.success){
                return res.status(404).json(result.msg);
            }

            return res.status(200).json(result);

        }catch(error){
            console.log("toggle like controler error: ", error);
            return res.status(404).json(error.message);
        }
    }


    //------- get all likes in article ---------//
    async getAllLikes(req,res,next){
        try{
            const articleId= req.query.articleId;
            if(!articleId){
                return res.status(404).json({success:false, msg:"error! article Id is required in request query params!"})
            }

            const likes = await this.likeRepository.getAllLike(articleId);
            if(!likes.success){
                return res.status(404).json(likes);
            }

            return res.status(200).json(likes);

        }catch(error){
            console.log("get all likes controler error: ", error);
            return res.status(404).json(error.message);
        }
    }

    //-------- get one like by like ID -------//
    async getOneLike(req,res,next){
        try{
            const likeId = req.query.likeId;
            if(!likeId){
                return res.status(404).json({success:false, msg:"error! like Id is required in request query params!"})
            }

            const like = await this.likeRepository.getOneLike(likeId);
            if(!like.success){
                return res.status(404).json(like);
            }

            return res.status(200).json(like);


        }catch(error){
            console.log("get one like controler error: ", error);
            return res.status(404).json(error.message);
        }
    }
}