import * as api from "../../api"
import {FETCH_USER, FETCH_USERS, FOLLOW_USER, UNFOLLOW_USER} from "../../constants"

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


// fetch user details 

export const fetchUser = (userId) => async(dispatch)=> {
    try {
        const {data} = await api.fetchUser(userId)
        
        dispatch({type:FETCH_USER,payload:data})
    } catch (error) {
     console.log(error.message)
    }
 }


