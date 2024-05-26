import AdminRepository from "./admin.repository.js";


export default class AdminController{
    constructor(){
        this.adminRepository = new AdminRepository();
    }


    //------ get admin access methods -------//
    async getAdminAccess(req,res,next){
        try{
            const userId = req.userId;
            const newRole = req.body.newRole;

           if(!newRole){
            return {success:false, msg:"role is required!"};
           }

           const result = await this.adminRepository.getAdminAccess(userId, newRole);
           if(!result.success){
            return res.status(404).json(result);
           }

           return res.status(200).json(result);

        }catch(error){
            console.log("error admin controller get access: ", error);
            return res.status(404).json(error.message);
        }
    }

    //------- get all premium user data --------//
    async getAllUserByPlan(req,res,next){
        try{
            const plan = req.query.plan;
            if(!plan){
                return res.status(404).json({success:false, msg:"please enter a valid plan"})
            }

            const result = await this.adminRepository.getAllUserByPlan(plan);
            if(result.success){
                return res.status(200).json(result);
            }

        }catch(error){
            console.log("error all premium user: ", error);
            return res.status(404).json(error.message);
        }
    }

    //----- get data for analytics ------//
    async getSystemAnalytics(req,res,next){
        try{
            const analyticsData = await this.adminRepository.getSystemAnalytics();
            if(analyticsData.success){
               return res.status(200).json(analyticsData);
            }

        }catch(error){
            console.log("error system analytics error: ", error);
            return res.status(404).json(error.message);
        }

    }

}
