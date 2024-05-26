import CommentRepository from "./comment.repository.js";

//------- a comment controller class containes all operation related to comments
export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }

    //----- post a new comments ------//
    async postComment(req,res,next){
        try{
            const userId = req.userId;
            const articleId = req.query.articleId;
            const content = req.body.content;

            if(!articleId || !content || !content.trim().length>5){
                return res.status(404).json({success:false, msg:"Article ID and valid content (at least 5 characters) are required"});
            }

            const result = await this.commentRepository.postComment(userId, articleId, content);
            if(!result.success){
                return res.status(404).json(result);
            }
            return res.status(404).json(result);

        }catch(error){
            console.log("post comment controller error: ", error);
            return res.status(404).json(error.message);
        }
    }


    //------ update the comments ---------//
    async updateComment(req,res,next){
        try{
            const userId = req.userId;
            const commentId = req.query.commentId;
            const content = req.body.content;

            if(!commentId || !content || !content.trim().length>5){
                return res.status(404).json({success:false, msg:"Comment ID and valid content (at least 5 characters) are required"});
            }

            const result = await this.commentRepository.updateComment(userId, commentId, content);
            if(!result.success){
                return res.status(404).json(result);
            }
            return res.status(404).json(result);

        }catch(error){
            console.log("post comment controller error: ", error);
            return res.status(404).json(error.message);
        }
    }


    //------- delete  a comments by the comments Id ----//
    async deleteComment(req, res, next){
        try{
            const userId = req.userId;
            const commentId = req.query.commentId;

            if(!commentId){
                return res.status(404).json({success:false, msg:"comments not found!"})
            }

            const result = await this.commentRepository.deleteComment(userId, commentId);
            if(!result.success){
                return res.status(404).json(result);
            }

            return res.status(404).json(result);

        }catch(error){
            console.log("post comment controller error: ", error);
            return res.status(404).json(error.message);
        }
    }


    //------- get all comments by comment article -----//
    async getAllComments(req,res,next){
        try{
            const articleId = req.query.articleId;
            if(!articleId){
                return res.status(404).json({success:false, msg:"Article Id is requireed in request query params!"})
            }

            const comments = await this.commentRepository.getAllCommentsByArticle(articleId);
            if(!comments.success){
                return res.status(404).json(comments)
            }

            return res.status(200).json(comments)

        }catch(error){
            console.log("post comment controller error: ", error);
            return res.status(404).json(error.message);
        }
    }


    //-------- get One comment by comment Id -----//
    async getOneCommentById(req,res,next){
        try{
            const commentId = req.query.commentId;
            if(!commentId){
                return res.status(404).json({success:false, msg:"comment Id is requireed in request query params!"})
            }

            const comment = await this.commentRepository.getOneCommentsById(commentId);
            if(!comment.success){
                return res.status(404).json(comment)
            }

            return res.status(200).json(comment)

        }catch(error){
            console.log("post comment controller error: ", error);
            return res.status(404).json(error.message);
        }
    }
}