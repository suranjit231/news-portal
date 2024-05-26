import mongoose from 'mongoose';

const premiumArticleSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const premiumModel= mongoose.model('PremiumArticle', premiumArticleSchema);
export default premiumModel;
