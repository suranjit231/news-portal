import express from "express";
import LikeController from "./like.controller.js";


const likeRoutes = express.Router();
const likeController = new LikeController();


//------- all the routes for like operation -----//

//------- toggle like routes ------//
likeRoutes.post("/toggleLike", (req,res,next)=>{
    likeController.toggleLike(req,res,next);
});

//------- get all likes routs ----//
likeRoutes.get("/getAllLikes", (req,res,next)=>{
    likeController.getAllLikes(req,res,next);
});

//-------- get one like routes ---//
likeRoutes.get("/getOneLike", (req,res,next)=>{
    likeController.getOneLike(req,res,next);
})



export default likeRoutes;