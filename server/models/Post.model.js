import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    text:{
        type:String,
        require:'Text is Required'
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
    likes:[{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    }],
    comments:[{
        text:String,
        postedBy:{type:mongoose.Schema.ObjectId,ref:'Users'},
        createdAt:{type:Date,default:Date.now}
    }]
},{timestamps:true})



const Post = mongoose.model("Post",PostSchema)

export default Post;