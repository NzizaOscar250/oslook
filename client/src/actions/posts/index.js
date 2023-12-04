import * as api from "../../api/"
import {ADD_COMMENT, CREATE_POSTS, DELETE_POST, FETCH_POSTS, FETCH_USER_POSTS, LIKE_POST, UNLIKE_POST, } from "../../constants/"


//retrieve posts 
export const fetchPost = ()=>async(dispatch)=>{

     try {
           const { data } =  await api.fetchPosts()
           dispatch({type:FETCH_POSTS,payload:data})
           dispatch({type:'Not Loading',payload:false})

     } catch (error) {
        console.log(error)
     }
}

//retrieve user's posts
export const fetchUserPosts = (userId)=>async(dispatch)=>{
      dispatch({type:'Not Loading',payload:true})
      try {
            const {data} = await api.fetchUserPosts(userId)
      
            dispatch({type:FETCH_USER_POSTS,payload:data}) 
            dispatch({type:'Not Loading',payload:false})
      } catch (error) {
            console.log(error)
      }
}


//create


export const createPosts= (formData)=>async(dispatch)=>{
      dispatch({type:'Not Loading',payload:true})
      try {
            const {data}= await api.createPosts(formData)
            
            dispatch({type:CREATE_POSTS,payload:data})

      } catch (error) {
            dispatch({type:CREATE_POSTS,payload:error.data})
      }
}

//delete


export const deletePost = (postId)=>async(dispatch)=>{
      try {
            const { data } = await api.deletePost(postId)
            
            dispatch({type:DELETE_POST,payload:data})
      } 
      catch (error) {
            console.log(error)
      }
}

// ________________________________LIKE POST_______________


export const likePost = (postId)=>async(dispatch)=>{
      try {
            const { data } = await api.likePost(postId)
          
            dispatch({type:LIKE_POST,payload:data})
      } 
      catch (error) {
            console.log(error)
      }
}

//_____________________________________UNLIKE POST____________________________________

export const unLikePost = (postId)=>async(dispatch)=>{
      try {
            const { data } = await api.unLikePost(postId)
            dispatch({type:UNLIKE_POST,payload:data})
      } 
      catch (error) {
            console.log(error)
      }
}
//_____________________________________COMMENT POST____________________________



export const addComment = (postId,comment)=>async(dispatch)=>{
      try {
            const {data} = await api.addComment(postId,comment)

            dispatch({type:ADD_COMMENT,payload:data})
          
      } catch (error) {
            console.log(error)
            
      }
}


