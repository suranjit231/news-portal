// Middleware to check if the user is an admin
import userModel from "../feature/users/userSchema.js";
export async function isAdmin(req, res, next) {

    const user = await userModel.findOne({_id:req.userId});
    console.log(user)
    if (user && user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ success: false, msg: 'Access denied. Admins only.' });
    }
}