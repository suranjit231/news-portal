import mongoose from "mongoose";
import userModel from "./userSchema.js";
import { hashedPassword,comparedPassword } from "../../utility/hashedPassword.js";
import { sendSubscriptionMail } from "../../utility/sendSubscriptionMail.js";


export default class UserRepository{

    //------ user signup ------//
    async signup(userData){
        try{
           const {username, email, password} = userData;
           if(!username || !email || !password){
                return {success:false, msg:"Please enter the required field!"}
           }
           const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
           if (!passwordRegex.test(password)) {
            return {success:false, msg:"Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and have a minimum length of 8 characters."}
          }

          const passwordHashed = await hashedPassword(password);
          userData.password = passwordHashed;

          const newUser = new userModel(userData);
          const savedUser = await newUser.save();
          const removedPasswordUser = this.removePasswordField(savedUser);



          return {success:true, msg:"User signup sucessful!", removedPasswordUser};

        }catch(error){
            console.log("error user signup repository: ", error);
            if (error instanceof mongoose.Error.ValidationError) {
                const messages = Object.values(error.errors).map(err => err.message);
                return { success: false, msg: messages.join('. ') };
              } else if (error.code === 11000) { // Duplicate key error
                const duplicateField = Object.keys(error.keyPattern)[0];
                return { success: false, msg: `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists.` };
              } else {
                return { success: false, msg: "An unexpected error occurred. Please try again later." };
              }
            
        }
    }



    //---------- user signin methods -----------//

    async signin(email, password){
        try{

            const user = await userModel.findOne({email:email});
            if(!user){
                return {success:false, msg:"user not found with this email ID!"};
            }

            const comparePasswordResult = await comparedPassword(password, user.password);
            if(!comparePasswordResult){
                return {success:false, msg:"invalid password!"};
            }

            const removedPasswordUser = this.removePasswordField(user)

            return {success:true, msg:"user signin sucessful!", removedPasswordUser};

        }catch(error){
            console.log("user repository signin error: ", error);
            throw error;
        }
    }

    
    //----------update user profile ------------//
    async updateProfile(userId, filteredUpdates){
        try{

            console.log("content to be updateable: ", filteredUpdates);
          
           const user = await userModel.findById(userId);
            if(!user){
                return {success:false, msg:"user not found!"};
            }

            for (const key in filteredUpdates) {

                // Skip updating if the key is 'admin'
            if (key === 'role' && filteredUpdates[key] === 'admin') {
                continue;
            }
                user[key] = filteredUpdates[key];
            }
    
            await user.save();

            const removedPasswordUser = this.removePasswordField(user)
            return {success:true, msg:"User profile is updated sucessfully!", removedPasswordUser}



        }catch(error){
            console.log("user repository signin error: ", error);
            throw error;
        }
    }


    //---------- subscription methods -----------//
    async subscribeUser(userId, plan, durationInMonths) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return { success: false, msg: "User not found!" };
            }

            const subscriptionPlans = ['free', 'premium'];
            if (!subscriptionPlans.includes(plan)) {
                return { success: false, msg: "Invalid subscription plan!" };
            }

            const startDate = new Date();
            const endDate = new Date(startDate);
            if (plan === 'premium') {
                endDate.setMonth(endDate.getMonth() + durationInMonths);
            }

            user.subscriptionStatus = {
                plan: plan,
                startDate: startDate,
                endDate: endDate
            };

            const updatedUser = await user.save();
            const removedPasswordUser = this.removePasswordField(updatedUser);
            await sendSubscriptionMail(removedPasswordUser);

            return { success: true, msg: "User subscribed successfully!", removedPasswordUser };

        } catch (error) {
            console.log("subscribeUser error: ", error);
            return { success: false, msg: "An error occurred while subscribing the user." };
        }
    }



    //----- get user subscription plan --------//
    async getSubscription(userId){
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return { success: false, msg: "User not found!" };
            }

            const { subscriptionStatus } = user;
            return { success: true, subscriptionStatus };

        } catch (error) {
            console.log("getSubscription error: ", error);
            return { success: false, msg: "An error occurred while retrieving subscription details." };
        }

    }



    //------ a utility methods for removing password form user before returning responses
    removePasswordField(user) {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }

}