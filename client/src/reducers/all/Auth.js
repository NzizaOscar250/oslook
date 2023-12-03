import { LOGOUT } from "../../constants";




export default function Auth(state={authData:null,ERROR:null,isLogedIn:false},action){
    switch (action.type) {
        case 'AUTH':
                // localStorage.setItem
               localStorage.setItem('profile',JSON.stringify(action?.payload))
             return {...state,authData: action?.payload}
        case 'AUTH_ERROR':
        return { ...state,ERROR:action.payload}
        case 'ISAUTHORIZED':
            return {...state,isLogedIn:action.payload}
        case LOGOUT:
            localStorage.removeItem('profile')
            localStorage.clear()
            return {authData:action.payload}
        default:
            if(localStorage.getItem('profile')){
                const  data = JSON.parse(localStorage.getItem('profile')).user
                return {...state,authData: data}
            }
            else{
                return state;
            }   
            
                       }
}


