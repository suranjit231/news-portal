import userModel from "../users/userSchema.js";
import articleModel from "../articles/articleSchema.js";

export default class AdminRepository{

     // Method to change user role to admin
     async getAdminAccess(userId, newRole) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return { success: false, msg: "User not found!" };
            }

            if(newRole !== "admin"){
                return { success: false, msg: "role must be a admin" };
            }
            user.role = newRole;
            await user.save();
            return { success: true, msg: "User role updated successfully!" };
        } catch (error) {
            console.log("change user role repository error: ", error);
            throw error;
        }
    }


    //------ get all premium user data --------//
    async getAllUserByPlan(plan){
        try{
            const user = await userModel.find({'subscriptionStatus.plan': plan}).select('-password');
            if(user?.length<1){
                return {success:true, msg:`No user has ${plan} plan!`};
            }

            return {success:true, msg:`Total ${plan} subscribe users are ${user.length}`, user};

        }catch(error){
            console.log("change premium user data repository error: ", error);
            throw error;
        }
    }


    //------ analysis all the system data suppose: totaluser, totalArticle, total premium subscriber -----//
    async getSystemAnalytics() {
        try {
            const analyticsData = {
                totalUsers: await userModel.countDocuments(),
                totalArticles: await articleModel.countDocuments(),
                premiumSubscribers: await userModel.countDocuments({ 'subscriptionStatus.plan': 'premium' }),
               
            };

            return { success: true, analyticsData };
        } catch (error) {
            console.log("Error fetching system analytics: ", error);
            throw error;
        }
    }
}