import express from "express"
import { addComment, createPost, deletePost, getAllPosts, getUserPosts, isThisTheOwner, likePost, postById, unlikePost } from "../controllers/posts/posts.controller.js"
import { isAuthorized } from "../middleware/Auth.js"
import { userById } from "../controllers/user.controllers.js";
const postRoutes = express.Router()


postRoutes.post("/create",isAuthorized,createPost)
          .delete("/remove/:postId",isAuthorized, isThisTheOwner ,deletePost)
          .put("/like/:postId",isAuthorized,likePost)
          .put("/unlike/:postId",isAuthorized,unlikePost)
          .post("/comment/:postId",isAuthorized,addComment)
          .get("/all",isAuthorized,getAllPosts)
          .get("/user/:userId",isAuthorized,getUserPosts);
          

postRoutes.param('postId',postById);
postRoutes.param('userId',userById)



export default postRoutes