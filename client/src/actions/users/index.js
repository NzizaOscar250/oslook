import * as api from "../../api"
import {FETCH_USER, FETCH_USERS, FOLLOW_USER, UNFOLLOW_USER, UPDATE_PROFILE} from "../../constants"

//follow user
export const followUser = (uid) => async(dispatch)=> {
    try {
        const {data} = await api.followUser(uid)
 
        dispatch({type:FOLLOW_USER,payload:data})
        dispatch({type:'Not Loading',payload:true})
    } catch (error) {
     console.log(error.message)
    }
 }
 
 //unfollow user
export const unFollowUser = (uid) => async(dispatch)=> {
    try {
        const {data} = await api.unFollowUser(uid)
 
        dispatch({type:UNFOLLOW_USER,payload:data})
    } catch (error) {
         console.log(error)
    }
 }
//fetch users


export const fetchUsers = () => async(dispatch)=> {
   try {
       const {data} = await api.fetchUsers()

       dispatch({type:FETCH_USERS,payload:data})
   } catch (error) {
    console.log(error.message)
   }
}


// fetch user

export const fetchUser = (userId) => async(dispatch)=> {
    try {
        const {data} = await api.fetchUser(userId)
        
        dispatch({type:FETCH_USER,payload:data})
    } catch (error) {
     console.log(error.message)
    }
 }


// fetch user details 

export const fetchUserDetails = (userId) => async(dispatch)=> {
    try {
        const {data} = await api.fetchUserDetails(userId)
        
        dispatch({type:FETCH_USER,payload:data})
    } catch (error) {
     console.log(error.message)
    }
 }

 //update profile

 
export const updateProfile = (userId,formData) => async(dispatch)=> {
    try {
        const {data} = await api.updateProfile(userId,formData)
        console.log(data)
        dispatch({type:UPDATE_PROFILE,payload:data})
    } catch (error) {
     console.log(error.message)
    }
 }


