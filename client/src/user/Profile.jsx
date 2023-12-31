import { Paper,Typography,List,Avatar,ListItem,ListItemSecondaryAction,ListItemAvatar,
    ListItemText,IconButton,Divider, makeStyles } from "@material-ui/core"
import { Link,useParams } from "react-router-dom"
import { Edit} from "@material-ui/icons"
import { teal , purple } from "@material-ui/core/colors"
import ConfirmActions from "../components/ConfirmActions"
import { useState,useEffect } from "react"
import TabsMenu from "../components/TabsMenu"
import { useDispatch,useSelector } from "react-redux";
import { fetchUserPosts } from "../actions/posts";
import Loading from "../components/Loading"
import moment from "moment/moment"
import FollowUnfollow from "../components/FollowUnfollow"
import { fetchUsers } from "../actions/users"



const Styles = makeStyles (theme => ({
    followBtn:{
        background:teal[500],
        color:'#fff',
        '&:hover':{
            background:teal[600]
        }
    },
    unfollowBtn:{
        background:purple[600],
        color:'#fff',
        marginLeft:5,
        '&:hover':{
            background:purple[500]
        }
    },
    root: {
        flexGrow: 1,
        width:"80%",
        margin: 'auto',

        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px  `
    },
    
    flex: {
        flex: 1,
        fontWeight:700
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    chip:{
        margin:5,
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
       ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
        },
    toolbarMargin: theme.mixins.toolbar
    }));

   
const Profile =({posts})=>{
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const {userId}= useParams()
    const {Posts,Auth} = useSelector((state)=>state)
    const Users= useSelector((state)=> userId ? state.Users.find((u)=>u._id === userId) : null)
    const onShowConfirm = ()=>{
        setOpen(!open)
    }

    const onConfirm = ()=>{
        setOpen(false)
    }
    
useEffect(() => {

    if(userId){
         dispatch(fetchUserPosts(userId))
         dispatch(fetchUsers())
    }
    else{
        console.log("failed")
    }
   
}, [dispatch,userId])

// check follow

const checkFollow = (user) => {
    const match = user?.followers?.some((follower)=> {
        return follower._id === Auth.authData._id
})
    return match
   }

  
   let following =  checkFollow(Users)
 
const classes = Styles()
if (!Users) return <Loading title="processing"/>
return (
        <>
        
         <Paper className={classes.root} elevation={2}>
        <ConfirmActions 
            open={open} 
            onShowConfirm={onShowConfirm}
            onConfirm={onConfirm} 
        />
       {/* <LinearProgress/>
        <Button className={classes.unfollowBtn}  variant="contained" disableElevation>unfollow</Button>
                    
       */}


    <Typography variant="h6" className={classes.title}>
             Profile
    </Typography>
    <List dense>

        <ListItem>
            <ListItemAvatar>
                <Avatar src={Users?.profile} style={{border:'2px solid dodgerblue'}}/>
                 
                
            </ListItemAvatar>
        <ListItemText 
                primary={
                    <Typography style={{fontWeight:600,color:purple[600],textTransform:'capitalize'}}>
                            {Users?.username} 
                    </Typography>
                }
                secondary={Users?.email}
        />
        <ListItemSecondaryAction>
 {
        (Auth.authData.username === Users.username) ? (
            <>
                    <Link to={`/profile/edit/${Auth.authData._id}`}>
                        <IconButton aria-label="Edit" color="primary">
                                <Edit/>
                        </IconButton>
                    </Link>

                   
            </>
        ):  (Auth.authData.username !== Users.username) && <FollowUnfollow following={following} userId={Users._id} />
       
 }
 
{
    
}


 </ListItemSecondaryAction>
        </ListItem>

    <Divider/>

    <ListItem>
            <ListItemText primary={Users?.about}
             secondary={`Joined : ${moment(Users.createdAt).fromNow()}` }/>
        
    </ListItem>
  

    <Divider/>

    <TabsMenu users={Users} posts={Posts}/>
    
    </List>
    </Paper>
        </>
   )}


   export default Profile