import express from "express";
import ArticleController from "./article.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const articleRoutes = express.Router();
const articleController = new ArticleController();

//------ sepreates routes for all articles operations


//------ post the article ---------//
articleRoutes.post("/postArticle",upload.single('image'), (req,res,next)=>{
    articleController.postArticle(req,res,next);
});


//--- update the article ---------//
articleRoutes.put("/updateArticle/:id", upload.single('image'), (req,res,next)=>{
    articleController.updateArticle(req,res,next);
});

//--- delete the article ---------//
articleRoutes.delete("/deleteArticle/:id", (req,res,next)=>{
    articleController.deleteArticle(req,res,next);
})

//--- get article by category routes---------//
articleRoutes.get("/byCategory", (req,res,next)=>{
    articleController.getArticleByCategory(req,res,next);
});

//--- get article by articleId routes---------//
articleRoutes.get("/byArticleId", (req,res,next)=>{
    articleController.getArticleById(req,res,next);
});

//---- get article by author name -----------//
articleRoutes.get("/byAuthor", (req,res,next)=>{
    articleController.getArticleByAuthor(req,res,next);
});


//---- search article by either tag, title, category, content ----//
articleRoutes.get("/bySearchTerm", (req,res,next)=>{
    articleController.searchArticle(req,res,next);
})

export default articleRoutes;
