import userModel from "../feature/users/userSchema.js";


//------ a middleware for checking is user have a premium plan for access premium article
export const checkSubscription = (requiredPlan) => {
    return async (req, res, next) => { 
        try {
            const user = await userModel.findById(req.userId);
            if (!user) return res.status(404).json({ success: false, msg: 'User not found.' });
            
            // If user is an admin, allow access regardless of subscription plan
            if (user.role === 'admin') {
                return next();
            }

            if (user.subscriptionStatus.plan !== requiredPlan) {
                return res.status(403).json({ success: false, msg: `Access denied. ${requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} subscription required.` });
            }

            next();
        } catch (error) {
            console.log("error for checking subscription plan: ", error)
            res.status(500).json({ success: false, msg: 'An error occurred while checking subscription.' });
        }
    };
};