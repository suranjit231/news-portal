import ArticleRepository from "./article.repository.js";

//------ a controller class for all article operation
export default class ArticleController{
    constructor(){
        this.articleRepository = new ArticleRepository();
    }

    //------- post new article ------//
    async postArticle(req,res,next){
        try{
            const articleData = req.body;
            const userId = req.userId;

            console.log("article data: ", articleData);

            // checking for required fields
            const requiredFields = ['title', 'content', 'category'];
            const missingFields = requiredFields.filter(field => !articleData[field]);

            if (missingFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    msg: `Missing required fields: ${missingFields.join(', ')}`
                });
            }
            if(req.file){
                articleData["image"] = req.file.filename;
            };
            

          const result= await this.articleRepository.postArticle(articleData, userId);
          if(!result.success){
            return res.status(404).json(result);

          }else{
            return res.status(201).json(result);
          }

        }catch(error){
            console.log("error post controller: ", error);
            return res.status(404).json(error.message);
        }
    }

    //------- update the article ----------//
    async updateArticle(req,res,next){
        try{
            const updateableData = req.body;
            const userId = req.userId;
            const articleId = req.params.id ;
            if(req.file){
                updateableData["image"] = req.file.filename;
            }

            const result = await this.articleRepository.updateArticle(userId, articleId, updateableData);
            if(!result.success){
                return res.status(404).json(result);
            }
            else{
                return res.status(200).json(result);
              }

        }catch(error){
            console.log("error update article controller: ", error);
            return res.status(404).json(error.message);
        }
    }


    //------ delete article controller --------//
    async deleteArticle(req,res,next){
        try{
            const userId = req.userId;
            const articleId = req.params.id;

            const result = await this.articleRepository.deleteArticle(userId, articleId);
            if(!result.success){
                return res.status(404).json(result);
            }else{
                return res.status(200).json(result);
              }

        }catch(error){
            console.log("error delete article controller: ", error);
            return res.status(404).json(error.message);
        }
    }

     //------ get article by category controller --------//
    async getArticleByCategory(req,res,next){
        try{
            const category = req.query.category;
            if(!category){
                return res.status(404).json({success:false, msg:"Category is required in request query parameter"})
            }

            const article = await this.articleRepository.getArticleByCategory(category);
            if(!article.success){
                return res.status(404).json(article);
            }

            return res.status(200).json(article);
        }catch(error){
            console.log("error get article by category article controller: ", error);
            return res.status(404).json(error.message);
        }
    }


     //------ get article by category controller --------//
     async getArticleById(req,res,next){
        try{
            const articleId = req.query.articleId;
            if(!articleId){
                return res.status(404).json({success:false, msg:"articleId is required in request query parameter"})
            }

            const article = await this.articleRepository.getArticleById(articleId);
            if(!article.success){
                return res.status(404).json(article);
            }

            return res.status(200).json(article);
        }catch(error){
            console.log("error get article by id article controller: ", error);
            return res.status(404).json(error.message);
        }
    }

  //------ get article by category controller --------//
    async getArticleByAuthor(req,res,next){
        try{
            const authorName = req.query.authorName;
            if(!authorName){
                return res.status(404).json({success:false, msg:"authorName is required in request query parameter"})
            }

            const articles = await this.articleRepository.getArticleByAuthor(authorName);
            if(!articles.success){
                return res.status(404).json(articles);
            }

            return res.status(200).json(articles);

        }catch(error){
            console.log("error get article by author article controller: ", error);
            return res.status(404).json(error.message);
        }
    }


    //-------- controller for searching article ----------//
    async searchArticle(req,res,next){
        try{

            const searchTerm = req.body;
            const articles = await this.articleRepository.searchArticle(searchTerm);
            if(!articles.success){
                return res.status(404).json(articles);
            }

            return res.status(200).json(articles);

        }catch(error){
            console.log("search article controller error: ", error);
            return res.status(404).json(error.message);
        }
    }



}