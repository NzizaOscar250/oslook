import {  FETCH_USERS, FOLLOW_USER, UNFOLLOW_USER, UPDATE_PROFILE } from "../../constants"

export default function Users (users = [], action){

  switch (action.type) {
  case FETCH_USERS:
    return action.payload
  case FOLLOW_USER:
  case UNFOLLOW_USER:
  case UPDATE_PROFILE:
     return users?.map((user)=>user._id === action.payload._id?action.payload:user)
  default:
    return users
  } 
  
}
