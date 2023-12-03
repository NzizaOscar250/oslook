import { Avatar, Button, IconButton, List, ListItem,Card, ListItemAvatar,ListItemSecondaryAction,ListItemText, Typography, Chip, LinearProgress } from "@material-ui/core";
import avatar from "../assets/img/avatar.png"
import { Link } from "react-router-dom";
import { RemoveRedEye } from "@material-ui/icons";
import Styles from "../Styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, followUser,unFollowUser } from "../actions/users";

export default function FindPeople(){

    const {Users,Loading,Auth} = useSelector((state)=>state)
     
    const dispatch = useDispatch()

     
    const logedInUser = useSelector((state)=>state.Auth.authData)
   
    const handleFollow = (type,id)=>(e)=>{
        if(type === 'FOLLOW'){
            dispatch(followUser(id))
        }
        else if(type ==='UNFOLLOW'){
            dispatch(unFollowUser(id))
        }
        else{
            console.log("Error on following")
        }
        
    }
    useEffect(() => {
        dispatch(fetchUsers())
      }, [dispatch])
  
    const classes = Styles()
        return (
            <>
            <Card>
                { Loading && <LinearProgress/>}
            <Typography variant="h6" 
             className={classes.title}>Who To Follow</Typography>
             
            <List style={{width:'80%',position:'relative'}}>
                {
                 Users.length && Users.filter((u)=>u._id !== Auth.authData._id || u.followers.username === Auth.authData.username).map((v,item)=>(
                        <span key={item}>
                        <ListItem >
                            <ListItemAvatar style={{padding:5}}>
                                    <Avatar src={avatar} style={{width:60,height:60}}/>
                            </ListItemAvatar>
                            <ListItemText 
                            primary={
                                <Typography color="primary"
                                component={Link}
                                className={classes.link}
                                style={{textTransform:'capitalize'}}
                                to={`/profile/${v._id}`}
                                >{v.username}</Typography>
                            } 
                            secondary={
                                <>
                                    <Chip component="span"  label={`${v.followers.length} followers`} size="small" style={{background:'white',padding:0}}/>
                                        <span style={{padding:5}}></span>
                                     <Chip component="span" label={`${v.following.length} following`} size="small" style={{background:'white',padding:0}}/>
                                     <span style={{padding:5}}></span>
                                     <Chip component="span" label='12 posts' size="small" style={{background:'white',padding:0}}/>
                                
                                </>
                            }/>
                            <ListItemSecondaryAction >
                                <Link to="/profile">
                                    <IconButton color="secondary">
                                        <RemoveRedEye/>
                                     
                                    </IconButton>
                                </Link>
                                {
                                  
                                    (v.followers.find((item)=>item.username === logedInUser.username))?
                                    (
                                       <>
                                        <Button variant="contained" 
                                        color="secondary"
                                        size="small"
                                        disableElevation


                                        onClick={handleFollow('UNFOLLOW',v._id)}>
                                            Unfollow</Button>
                                        </>
                                    
                                    ):(
                                        <>
                                         <Button variant="contained" 
                                           color="primary" onClick={handleFollow('FOLLOW',v._id)}
                                           size="small"
                                           disableElevation

                                           >
                                            Follow</Button>
                                            </> 
                                    )
                                }
                               
                               
                            </ListItemSecondaryAction>
                        </ListItem>
                    </span>
                    ))

                   
                }
            </List>
            </Card>
            
            </>
        )
}