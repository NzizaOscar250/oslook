import {ADD_COMMENT, CREATE_POSTS, DELETE_POST, FETCH_POSTS, FETCH_USER_POSTS, LIKE_POST, UNLIKE_POST} from "../../constants/"
export default function PostReducers(posts=[],action){

    switch (action.type) {
        case CREATE_POSTS:
            return [action.payload,...posts]
        case FETCH_POSTS:
            return action.payload
        case FETCH_USER_POSTS:
        
            return action.payload
        case UNLIKE_POST:
        case LIKE_POST:
        case ADD_COMMENT:
            return posts.map((post)=>post._id === action.payload._id?action.payload:post)         
        case DELETE_POST:
            return posts.filter((post)=>post._id !== action.payload._id)   
        default:
        return posts
    }
}