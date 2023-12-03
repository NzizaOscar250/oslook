import  Express   from "express";
import cors from "cors";
import bodyParser  from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import authroutes from "./routes/auth.routes.js"
import bcrypt from "bcrypt";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/posts.routes.js";
dotenv.config();
const app = Express();
const   PORT=process.env.PORT | 8000;
const url="mongodb://127.0.0.1:27017/social_media_platform";
app.use(bodyParser.json({limit: "30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}))
app.use(cors());
app.use("/auth",authroutes);
app.use("/users",userRoutes);
app.use("/posts",postRoutes)
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=> console.log("connected"));
}).catch((e)=>console.log(`Not connected ${e}`));

