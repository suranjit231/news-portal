import express from 'express';
import PremiumArticleController from './premium.controller.js';
import { auth } from '../../middleware/jwtAuth.middleware.js';
import { checkSubscription } from '../../middleware/checkSubscription.js';

const premiumRoutes = express.Router();
const premiumArticleController = new PremiumArticleController();

//------ a routes for premium contents post
premiumRoutes.post('/', auth, (req,res,next)=>{
    premiumArticleController.addPremiumArticle(req,res,next);
});

//------ a routes for premium watching premium article
premiumRoutes.get('/', auth, checkSubscription('premium'),(req,res,next)=>{
    premiumArticleController.getPremiumArticles(req,res,next)});

export default premiumRoutes;