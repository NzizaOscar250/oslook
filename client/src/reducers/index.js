import { combineReducers } from "redux";
import Auth from "./all/Auth";
import Posts from "./all/Posts.reducer"
import Loading from "./Loading"
import Users from "./all/Users.reducer";
export default combineReducers({
    Auth,Posts,Loading,Users
})