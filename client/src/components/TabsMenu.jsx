import { AppBar, Avatar,ListItemText, List, ListItem, ListItemIcon, Tab, Tabs, Typography } from "@material-ui/core";
import Styles from "../Styles";
import { useState } from "react";
import { Link} from "react-router-dom";
import Posts from "../posts/Post";




export default function TabsMenu({users,posts}){

const classes = Styles()
const [values,setValues] = useState(0)
const changeTab=(e,value)=>{
    setValues(value)
}

    return (
        <>
        
            <AppBar position="relative"
                color="default"
                className={classes.AppBar}
                elevation={0}
            >
                <Tabs value={values}
                 onChange={changeTab}
                 indicatorColor="primary"
                >
                        <Tab label={`POSTS (${posts?.length})`} style={{color:'green',fontWeight:700}} />
                        <Tab label={`Followers (${users?.followers?.length})`} style={{color:'green',fontWeight:700}} />
                        <Tab label={`Following (${users?.following?.length})`} style={{color:'green',fontWeight:700}} />
                </Tabs>
            </AppBar>

                        {values=== 0 && (
            <>
      
                 <Posts posts={posts}/> 
            
            </>
            )}
            {values=== 1 && 

            (users.followers.length !== 0)&&(
            <List>
               {
                users && users.followers && users.followers.map((item)=>(
                    <ListItem component={Link} 
                     to={`/profile/${item._id}`} key={item._id}
                     
                     >
                         <ListItemIcon>
                            <Avatar src={item?.profile}/>
                        </ListItemIcon>
                        <ListItemText
                         primary={
                            <Typography component="p"
                             style={{fontWeight:600,fontSize:14,color:'dodgerblue',paddingBlock:0}}>
                                {item.username} 
                            </Typography>
                         }
                        secondary={
                                <Typography component="span"
                                style={{fontSize:12,color:'grey'}}
                                >{item.about && `About: ${item.about}`}</Typography>
                        }/>
                        
                
                    </ListItem>
                ))

               } 
            </List>
            )

        
    }
            {values === 2 && (
            
            (users.following.length !== 0)&&(
                <List>
                {
                    users.following.map((item)=>(
                        <ListItem component={Link} to={`/profile/${item._id}`} key={item._id}>
                            <ListItemIcon>
                                <Avatar src={item?.profile}/>
                            </ListItemIcon>
                            <ListItemText 
                                primary={
                                    <Typography component="p"
                                     style={{fontWeight:600,fontSize:14,color:'dodgerblue',paddingBlock:0}}>
                                        {item.username} 
                                    </Typography>
                                 }
                                secondary={
                                    <Typography component="span"
                                    style={{fontSize:12,color:'grey'}}
                                    >{item.about && `About: ${item.about}`}</Typography>
                                     }
                                />
                    
                        </ListItem>
                    ))

                } 
                </List>
                )

            )}

        </>
    )
}