import { FETCH_USER, FETCH_USERS } from "../../constants"

export default function Users (users = [], action){
  switch (action.type) {

  case FETCH_USERS:
    return action.payload
  case FETCH_USER:
    return action.payload
    //  return users?.map((user)=>user._id === action.payload._id?action.payload:user)
  default:
    return users
  } 
}
