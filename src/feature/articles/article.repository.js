import mongoose from "mongoose";
import articleModel from "./articleSchema.js";
import userModel from "../users/userSchema.js";
import { ObjectId } from "mongodb";


export default class ArticleRepository{

    //---- methods for post new article
    async postArticle(articleData, userId){
        try{
            const user = await userModel.findOne({_id:userId});
            console.log(user)
            if (!user || (user.role !== "author" && user.role !== "admin")) {
                return { success: false, msg: "Can't post article; you are not authorized to post articles!" };
            }

            if(user.role=="author"){
                articleData.author = userId
            }else if(user.role=="admin"){
                articleData.author = userId
            }

            const newArticle = new articleModel(articleData);
            const savedArticle = await newArticle.save();

             user.articles.push(savedArticle._id);
             await user.save();
            return {success:true, msg:"Articcle posted successfully!", savedArticle};

        }catch(error){
            console.log("post article repository error: ", error);
            throw error;
        }
    }

    //------- methods for update the article --------//
    async updateArticle(userId,articleId, updateableData, ){
        try{
            const article = await articleModel.findOne({_id:articleId});
            if(!article){
                return {success:false, msg:"Article not found!"}
            }

            
            if(article.author.toString() !== userId.toString()){
                return { success: false, msg: "Can't update article; you are not authorized to post articles!" };
            }

            for (const key in updateableData) {
                article[key] = updateableData[key];
            }

            await article.save();
            return {success:true, msg:"Article is updated successfully!", article};


        }catch(error){
            console.log("update article repository error: ", error);
            throw error;
        }
    }


    //-------- delete the article -----------//
    async deleteArticle(userId, articleId){
        try{
            const article = await articleModel.findOne({_id:articleId});
            if(!article){
                return {success:false, msg:"Article not found!"}
            }

            if(article.author.toString() !== userId.toString()){
                return { success: false, msg: "Can't delete article; you are not authorized to delete the articles!" };
            }
            const user = await userModel.findOne({_id:userId});

            const deleteResult=await articleModel.deleteOne({_id:article._id});
            console.log(deleteResult);
            if (deleteResult.deletedCount > 0) {
                user.articles.pull(articleId._id);
                await user.save();
                return { success: true, msg: "Article deleted successfully!" };

            } else {
                return { success: false, msg: "Failed to delete article!" };
            }


        }catch(error){
            console.log("update article repository error: ", error);
            throw error;
        }
    }


    //--------- get article by category ---------//
    async getArticleByCategory(category){
        try{
            const articles = await articleModel.find({category:category}).populate('author', 'username');
            if(articles.length<1){
                return {success:false, msg:"No article find with this category"};
            }

            return {success:true, msg:`Total ${articles.length} article posted in the ${category} category`, articles};

        }catch(error){
            console.log("get article repository error: ", error);
            throw error;
        }
    }

     //--------- get article by Id ---------//
    async getArticleById(articleId){
        try{
            const articles = await articleModel.findOne({_id:articleId}).populate('author', 'username');
            if(articles.length<1){
                return {success:false, msg:"No article find with this articleId"};
            }

            return {success:true, msg:`article found sucessfully!`, articles};

        }catch(error){
            console.log("get article repository error: ", error);
            throw error;
        }
    }


    //--------- get article by author name ------//
    async getArticleByAuthor(authorName) {
        try {
            const author = await userModel.findOne({ username: authorName });
            if (!author) {
                return { success: false, msg: "Author not found!" };
            }

            const articles = await articleModel.find({ author: author._id }).populate('author', 'username');
            if (articles.length < 1) {
                return { success: false, msg: "No articles found for this author" };
            }

            return { success: true, msg: `Total ${articles.length} article(s) found for author ${authorName}`, articles };
        } catch (error) {
            console.log("get article by author repository error: ", error);
            throw error;
        }
    }


    //-------- search article by either cateory, title, tags, or content it may be any thing -----
    async searchArticle({ title, content, category, tags }) {
        try {
            const query = {};

            if (title) {
                query.title = { $regex: title, $options: 'i' }; // case-insensitive regex search
            }

            if (content) {
                query.content = { $regex: content, $options: 'i' }; // case-insensitive regex search
            }

            if (category) {
                query.category = category;
            }

            if (tags && tags.length > 0) {
                query.tags = { $all: tags }; 
            }

            const articles = await articleModel.find(query).populate('author', 'username');
            if (articles.length < 1) {
                return { success: false, msg: "No articles found matching the search criteria" };
            }

            return { success: true, msg: `Total ${articles.length} article(s) found`, articles };

        } catch (error) {
            console.log("search article repository error: ", error);
            throw error;
        }
    }
}