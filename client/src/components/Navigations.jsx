import React, {  useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link} from 'react-router-dom';
import {  Close,Group, Search, SearchRounded, CodeOutlined  } from '@material-ui/icons';
import DropMenu from './DropMenu';
import Styles from '../Styles';
import { Avatar, Badge,InputBase, LinearProgress } from '@material-ui/core';
import livingRoom from "../assets/img/livingroom.jpg"


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
            
 {/* <Badge badgeContent={4} color='inherit'  component={Link} to="/followothers">
                <Group />
            </Badge> */}
            
            {/* <IconButton
            color = 'inherit'
            component={Link}
            to="/"
            className={classes.responsive}
            >
                <Home/>
            </IconButton> */}
          
          <IconButton component={Link} to="/findpeople">
            <Badge badgeContent={5} color="secondary" overlap="rectangular">
                <Group style={{color:'white'}} />
            </Badge> 
         </IconButton>
           
             
            
     
     {/* <Badge badgeContent={4} color='secondary'>
        <Notifications/>
     </Badge> */}
{/*         
        <Button color="inherit"
       component={Link}
       to="/profile"
       className={classes.responsive}
        ></Button>


        <Button color="inherit"
            component={Link}
            to="/auth/signin"
            className={classes.responsive}
                ></Button>

                        <Button color="inherit"
            component={Link}
            to="/auth/signup"
            className={classes.responsive}
                ></Button>
*/}
                <IconButton onClick={Toggle}>
                <Avatar src={livingRoom} alt="not found"/>
                </IconButton> 

            </div>
          

        </Toolbar>
     </AppBar>
      
      
</div>
)
    
};

export default Navigations