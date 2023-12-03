import exress from "express"
import { getAllUsers,getUser,updateUser,deleteUser, userById,addFollowing,addFollower,
    removeFollowing,removeFollower,getUserDetailsById } from "../controllers/user.controllers.js"
import { isAuthorized } from "../middleware/Auth.js"
const userRoutes = exress.Router()

userRoutes.get('/',isAuthorized,getAllUsers)
          .get('/:userId',isAuthorized,getUser)
          .get('/details/:user',isAuthorized,getUser)

          .put("/:userId",isAuthorized,updateUser)
          .delete("/:userId",isAuthorized,deleteUser);
userRoutes.put('/:userId/follow',isAuthorized,addFollowing,addFollower)
          .put("/:userId/unfollow",isAuthorized,removeFollowing,removeFollower);


userRoutes.param('userId',userById)
userRoutes.param('user',getUserDetailsById)
export default userRoutes