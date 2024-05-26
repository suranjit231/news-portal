import premiumModel from "./premiumSchema.js";

//----- premium repository class for add and get premium access
export default class PremiumArticleRepository {

    //------ add premium article ----------//
     async addPremiumArticle(userId,title,content){
        try {
            const newArticle = new premiumModel({userId, title, content });
            const savedArticle = await newArticle.save();
            return { success: true, article: savedArticle };
        } catch (error) {
            console.log("premium repository post error: ", error);
           throw error;
        }
    }

     //------ get premium article ----------//
     async getPremiumArticles() {
        try {
            const articles = await premiumModel.find();
            return { success: true, articles };
        } catch (error) {
            console.log("premium repository get error: ", error);
            throw error;
           
        }
    }
}
