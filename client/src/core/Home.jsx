
import { Outlet } from "react-router-dom";
import Navigations from "../components/Navigations"
import FooterSec from "../components/FooterSec"
import Styles from "../Styles"
import {  Paper,Grow } from "@material-ui/core";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions/auth';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"
import { fetchUsers } from "../actions/users";
export default function Home() {
const classes = Styles()
const navigate = useNavigate()
const dispatch =useDispatch()

const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
const [isAuthenticated,setIsAuthenticated] =useState(false)

useEffect(()=>{

    const token = user?.token
    if (token) {
        const decoded = jwtDecode(token)
        
        if(decoded.exp * 1000 < new Date().getTime()){
           dispatch(signOut(navigate))
         
        }
        
    }else{
        navigate("/auth")
    }
      setUser(JSON.parse(localStorage.getItem('profile')))
      setIsAuthenticated(true)
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
        dispatch(fetchUsers())
 
    
      
},[navigate,dispatch,user?.token])



if (!isAuthenticated) return  <Loading title="Authenticating"/>

    return <>
              
              <Navigations userId={user?.user} />
              <Grow in >
              <Paper className={classes.card} elevation={0}>
               
                <Outlet/>
              </Paper>
              </Grow>
              <FooterSec/>
    </>
}