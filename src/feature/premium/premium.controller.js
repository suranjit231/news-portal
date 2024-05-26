import PremiumArticleRepository from "./premium.repository.js";


export default class PremiumArticleController {

    constructor(){
        this.premiumArticleRepository = new PremiumArticleRepository();
    }


    //----- add premium article controller ------//
     async addPremiumArticle(req, res) {
        try {
            const userId = req.userId;
            const { title, content } = req.body;
            if(!title || !content){
               return res.status(500).json({ success: false, msg: "Title and content is required" });
            }
            const article =await this.premiumArticleRepository.addPremiumArticle(userId, title, content);
            res.status(201).json({ success: true, article: article });
        } catch (error) {
            res.status(500).json({ success: false, msg: "An error occurred while adding the premium article." });
        }
    }

    //----- get premium article controller ------//
     async getPremiumArticles(req, res) {
        try {
            const articles = await this.premiumArticleRepository.getPremiumArticles();
            res.status(200).json({ success: true, articles });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}