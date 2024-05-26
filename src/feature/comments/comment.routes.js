import express from "express";
import CommentController from "./comment.controller.js";

const commentRoutes = express.Router();
const commentController = new CommentController();

//------- routes for all comments operations --------//

//---- post a new comments routes -------//
commentRoutes.post("/", (req,res,next)=>{
    commentController.postComment(req,res,next);
})

//---- update comments routes -------//
commentRoutes.put("/", (req,res,next)=>{
    commentController.updateComment(req,res,next);
});

//---- delete comments routes ------//
commentRoutes.delete("/", (req,res,next)=>{
    commentController.deleteComment(req,res,next);
});

//---- get all comments by acticle ---//
commentRoutes.get("/all-comments", (req,res,next)=>{
    commentController.getAllComments(req,res,next);
})

//---- get one comment by comment Id ---//
commentRoutes.get("/getOneComment", (req,res,next)=>{
    commentController.getOneCommentById(req,res,next);
})



export default commentRoutes;