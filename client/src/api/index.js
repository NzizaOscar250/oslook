import axios from "axios";



const API = axios.create({baseURL:'http://localhost:8000/'})

let user = (localStorage.getItem("profile"))? JSON.parse(localStorage.getItem("profile")).token : null;


API.interceptors.request.use((req)=>{
    
    if(localStorage.getItem("profile")){
        req.headers.Authorization= "Bearer "+user
    }
    

    return req
})



export const signIn = (formData)=>API.post("/auth/signin",formData)
export const signUp = (formData)=>API.post("/auth/signup",formData)
export const signout = ()=>API.get('/auth/signout');

export const fetchPosts = ()=>API.get('/posts/all')
export const fetchUserPosts = (userId)=>API.get(`/posts/user/${userId}`)

//delete api
export const deletePost=(postId)=>API.delete(`/remove/${postId}`)
//like post
export const likePost = (postId)=>API.put(`/posts/like/${postId}`)
export const unLikePost = (postId)=>API.put(`/posts/unlike/${postId}`)
//COMMENTS
    //ADD COMMENT
        export const addComment = (postId,comment)=>API.post(`/posts/comment/${postId}/`,{comment:comment})
    //REMOVE COMMENT
       export const removeComment = (postId,commentId)=>API.delete(`/posts/comment/${postId}/${commentId}`)
//users
    //get user + details
       export const fetchUser = (userId)=>API.get(`/users/${userId}`)
export const fetchUserDetails = (userId)=>API.get(`/users/details/${userId}`)
//get users
        export const fetchUsers = ()=>API.get('/users')
    // follow user
        export const followUser = (followerId)=>API.put(`/users/${followerId}/follow`,{userId:user._id,followId:followerId})
    //unfollow user
        export const unFollowUser = (followingId)=>API.put(`/users/${followingId}/unfollow`,{unfollowId:followingId})

export const deleteProfile = (userId)=>API.delete(`/users/${userId}`)
export const fetchUserProfile = (userId)=>API.get(`/users/${userId}`)


//_______________CREATE___________________

export const createPosts = (formData)=>API.post('/posts/create',formData)


