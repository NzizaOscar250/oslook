import React, {  useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link} from 'react-router-dom';
import {  Close,Group, Search, SearchRounded, CodeOutlined  } from '@material-ui/icons';
import DropMenu from './DropMenu';
import Styles from '../Styles';
import { Avatar, InputBase, LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
const  Navigations = ({userId})=>{
    const [menu, setMenu] =  useState({open:false,anchor:null}) 
    const Toggle=function(e){
     setMenu({open:!menu.open,anchor:e.target})
    }
    const onClose = ()=>{
        setMenu({open:false,anchor:null})
    }
    const [open,setOpen] = useState(false)
    const classes = Styles({open})
    const Users= useSelector((state)=> userId ? state.Users.find((u)=>u._id === userId._id) : null)

useEffect(() => {
  console.log("stille tesf..................")

}, [Users])

 
return (
  
<div>
    <LinearProgress/>
        <AppBar position="fixed" color='primary' >
        <Toolbar className={classes.toolBar}>
            <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={Toggle}
                >
                <MenuIcon   />
            </IconButton>

           <DropMenu isOpen={menu.open} anchor={menu.anchor} onClose={onClose} userId={userId}/>

            <Typography
                color="inherit"
                className={classes.flex}
                component={Link}
                to="/"
                style={{textDecoration:'none',display:'flex',alignItems:'center',gap:5}}
                
            >
            STAR DEV <CodeOutlined/>
            </Typography>

            <div className={classes.search}>
               
                <Search/>
                <InputBase placeholder='Search....' className={classes.input} />

            </div>
            
            {    open?(
                  <IconButton color='inherit' onClick={()=>setOpen(false)} >
                      <Close  className={classes.searchicon}/>
                   </IconButton>
                    ):
                (
                    <IconButton color='inherit' onClick={()=>setOpen(true)} >
                        <SearchRounded 
                        className={classes.searchicon}/>
                    </IconButton>
                    )
            }
           
            




 <div className={classes.icons}>
          
          <IconButton component={Link} to="/findpeople">
            {/* <Badge badgeContent={5} color="secondary" overlap="rectangular"> */}
                <Group style={{color:'white'}} />
            {/* </Badge>  */}
         </IconButton>
           
                <IconButton onClick={Toggle} style={{background: 'grey',padding:0,width:50,height:50}}>
                        <Avatar src={Users?.profile} alt="not found" style={{ width:'100%',height:50}}/>
                </IconButton> 

            </div>
          

        </Toolbar>
     </AppBar>
      
      
</div>
)
    
};

export default Navigations