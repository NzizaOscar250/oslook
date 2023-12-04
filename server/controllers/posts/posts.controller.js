import mongoose from "mongoose";
import Post from "../../models/Post.model.js";



export const getUserPosts=async(req,res)=>{

    try {
        const result = await Post.find({postedBy:req.profile._id})
                                    
                                 .populate("postedBy",'_id username profile ')
                                 .populate('comments.postedBy','_id username ')
                                 .sort("createdAt")
                                 .exec()


            if(!result) return res.status(400).json({error:"No posts yet"})
              res.json(result)
                             } catch (error) {
                              console.log(error)
                             }
}

export const getAllPosts=async(req,res)=>{

    try {
        const result = await Post.find()
                                 .populate("postedBy",'_id username profile')
                                 .populate('comments.postedBy','_id username profile ')
                                 .sort("-createdAt")
                                 .exec()
            if(!result) return res.status(400).json({error:"No posts Found"})
            res.json(result)
        } catch (error) {
           return   res.status(400).json({error:error})
        } 
    
}


export const createPost = async(req,res)=>{
   try {
       const post = req.body
       const userId = req.userId
       console.log(post)
     
       
    const result = await Post.create({
         text:post.text,
         photo:post.photo,
         postedBy:userId
    })


if(!result) res.status(400).json({error:"could not make a post"})

const newPost = await Post.findById(result._id)
.populate("postedBy",'_id username profile')
.populate('comments.postedBy','_id username profile')
.sort("-createdAt")
.exec()



if(!newPost) res.status(400).json({error:"refused to retrieve"})

res.json(newPost)

   } catch (error) {
   console.log(error)
   }
}


export const isThisTheOwner=(req,res,next)=>{
    let isOwner = req.post && req.userId && req.post.postedBy._id == req.userId


if(!isOwner) return res.status(403).json({error:'Unauthorized access attempt'})

    next()

}


export const deletePost = async(req,res)=>{
   
try {
    const remove = await Post.findByIdAndRemove(req.post._id)

    if(!remove) res.status(400).json({error:'could not be removed'})

    res.json(remove)

} catch (error) {
    res.status(400).json({error:error.message})
}
}

const getFullPost = async(postId)=>{
    try {
        const newPost = await Post.findById(postById)
                                  .populate("postedBy",'_id username')
                                  .populate('comments.postedBy','_id username')
                                  .sort("-createdAt")
                                  .exec()

        if(!newPost) return "invalid Post";
        return newPost;
    } catch (error) {
        return "invalid Post".error;
    }
}

export const likePost = async(req,res)=>{
    try {

        const result = await Post.findByIdAndUpdate(req.post._id,{
            $push:{likes:req.userId}
        },{new:true})

        if(!result) res.status(400).json({error:'Post Removed'})
        
        const newPost = await Post.findById(result._id)
                                  .populate("postedBy",'_id username profile')
                                  .populate('comments.postedBy','_id username profile')
                                  .sort("-createdAt")
                                  .exec()

       
        res.json(newPost)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


export const unlikePost = async(req,res)=>{
    try {
        const result = await Post.findByIdAndUpdate(req.post._id,{
            $pull:{likes:req.userId}
        },{new:true})

        if(!result) res.status(400).json({error:'invalid Post'})
        
        const newPost = await Post.findById(result._id)
                                  .populate("postedBy",'_id username profile')
                                  .populate('comments.postedBy','_id username profile')
                                  .sort("-createdAt")
                                  .exec()


        res.json(newPost) 
    } catch (error) {
        console.log(error.message)
    }
}


export const addComment = async(req,res)=>{

    
    const comment ={
        text:req.body.comment,
        postedBy:req.userId
    }
    try {
        if (!comment.text) res.status(403).json({error:"comment text is required"})
        let result = await Post.findByIdAndUpdate(req.post._id,
        {$push: {comments:comment}},
        {new: true})
        .populate('comments.postedBy', '_id username ')
        .populate('postedBy', '_id username  ')
        .exec()
        
        const newPost = await Post.findById(result._id)
                                    .populate("postedBy",'_id username ')
                                    .populate('comments.postedBy','_id username profile')
                                    .sort("-createdAt")
                                    .exec()


res.json(newPost)
    } 
    catch(err) {
            console.log(err.message)
    }
   
}
export const removeComment = async(req,res)=>{

}
export const postById = async(req,res,next,id)=>{
    try {
        if(!mongoose.isValidObjectId(id)) res.status(401).json({error:'Invalid Post'})

        let post = await Post.findById(id)
                             .populate("postedBy",'_id username')
                             .populate('comments.postedBy','_id username')
                             .sort("-createdAt")
                             .exec()
                             
        
        if(!post) return res.status(400).json({error:'Post not Found'})
      
        req.post = post
        next()
        

    } catch (error) {
            res.status(400).json({error:'could not retrieve the post',err:error})

    }
}