import express from "express";
import AdminController from "./admin.controller.js";
import { isAdmin } from "../../middleware/checkIsAdmin.middleware.js";


const adminRoutes = express.Router();
const adminController = new AdminController();


//------- routes for admin only ----------//
adminRoutes.put("/getAdmin", (req,res,next)=>{
    adminController.getAdminAccess(req,res,next);
})

//------- get all user by plan ----------//
adminRoutes.get("/getUserPlan", isAdmin, (req,res,next)=>{
    adminController.getAllUserByPlan(req,res,next);
});

//------- get system analyticsData ------//
adminRoutes.get("/getAnalyticsData", isAdmin, (req,res,next)=>{
    adminController.getSystemAnalytics(req,res,next);
})

export default adminRoutes;