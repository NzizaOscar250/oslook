import * as api from "../../api"
import { LOGOUT } from "../../constants"
export const signUp =(formData,history)=> async (dispatch)=>{
    
    try {
        const {data} = await api.signUp(formData)

      dispatch({type:'AUTH',payload:data})
      history('/')
      window.location.reload()
    } catch (error) {
        dispatch({type:'AUTH_ERROR',payload:error.response.data.error})
    }
}

export const signIn =(formData,history)=> async (dispatch)=>{
    
    try {
        const { data }= await api.signIn(formData)
        dispatch({type:'AUTH',payload:data})
        history('/')
        window.location.reload()
    } catch (error) {
        
        dispatch({type:'AUTH_ERROR',payload:error.response.data.error})
     
    
    }
}


export const  signOut =(history)=>async(dispatch)=>{
    try {
        const {data} = await api.signout()
         dispatch({type:LOGOUT,payload:data})
         history('/')
         window.location.reload()

    } catch (error) {
        console.log(error)
    }
} 


export const isAuthorized = ()=>(dispatch)=>{
   
    if(localStorage.getItem('profile')){
        dispatch({type:'ISAUTHORIZED',payload:true})
    }
    else{
        dispatch({type:'ISAUTHORIZED',payload:false})
    }
}