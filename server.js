//*----- Server.js file ---------*//

//*----- import necessary dependencies--*//
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectMongodb } from "./src/databaseConnection/connectMongoDB.js";
import cors from "cors";
import userRoutes from "./src/feature/users/user.routes.js";
import cookieParser from "cookie-parser";
import { auth } from "./src/middleware/jwtAuth.middleware.js";
import premiumRoutes from "./src/feature/premium/premium.routes.js";
import otpRoutes from "./src/feature/passwordReset/resetPassword.routes.js";
import articleRoutes from "./src/feature/articles/article.routes.js";
import commentRoutes from "./src/feature/comments/comment.routes.js";
import likeRoutes from "./src/feature/likes/like.routes.js";
import adminRoutes from "./src/feature/admin/admin.routes.js";
//import swagger from "swagger-ui-express";
// import apiDocs from './swagger.json' assert {type: 'json'};


//------ app configuration ---------//
const app = express();

//------ setup middleware for processing request and response data -------//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


//----- configure middleware for diffrent routes ------//

//.... swagger documentation api...
//app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

//---- users routes -----//
app.use("/api/users", userRoutes);

//----- password-reset routes
app.use("/api/password-reset", otpRoutes);

//---- article routes --------//
app.use("/api/article", auth, articleRoutes);

//----- premium feature routes --//
app.use("/api/premium-articles", premiumRoutes);

//----- Comments routes ------//
app.use("/api/comments", auth, commentRoutes);

//----- Like routes ---------//
app.use("/api/likes", auth, likeRoutes);

//----- admin routes -------//
app.use("/api/admin", auth, adminRoutes);


//----- setup a default rautes for 3200 port ------//
app.get("/", (req,res,next)=>{
    res.status(200).json("Welcome to our news website!");

})


let port = process.env.PORT || 3200 ;
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
    connectMongodb();
});
