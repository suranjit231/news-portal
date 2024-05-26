import mongoose from "mongoose";

//const URL = "mongodb://localhost:27017/"
//----- connecting mongodb data-base -------//
const connectMongodb  = async()=>{

    try{
        await mongoose.connect(process.env.DB_URL+"/news_website_db",
            {useNewUrlParser:true},
            {useUnifiedTopology:true})

        console.log("mongodb is connected");

    }catch(error){
        console.log("database connection faild!")
    }
   
}

export {connectMongodb};