
import { Outlet } from "react-router-dom";
import Navigations from "../components/Navigations"
import FooterSec from "../components/FooterSec"
import Styles from "../Styles"
import { CircularProgress, Paper,Grow } from "@material-ui/core";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { signOut } from '../actions/auth';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

},[navigate,dispatch,user?.token])



if (!isAuthenticated) return (<>

    <Paper component="div" elevation={0} style={{display:'flex',background:'transparent',minHeight:500,alignItems:'center',justifyContent:'center',padding:50}}>
       <div color="primary" style={{display:'flex',gap:10,fontWeight:600,background:'white',borderRadius:8,padding:10}}>
          <span>...processing </span> <CircularProgress size={20}/>
       </div>
    </Paper>

</>)

    return <>
              
              <Navigations />
              <Grow in >
              <Paper className={classes.card} elevation={0}>
               
                <Outlet/>
              </Paper>
              </Grow>
              <FooterSec/>
    </>
}