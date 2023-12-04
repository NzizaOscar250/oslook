import { Paper,makeStyles } from "@material-ui/core"
import { Outlet, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch} from "react-redux";
import { fetchUserPosts } from "../actions/posts";
import { fetchUser } from "../actions/users"
import { useSelector } from "react-redux";
const Styles = makeStyles (theme => ({
    root: {
        flexGrow: 1,
        width:"80%",
        margin: 'auto',
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px  `
    },

    }));

  
const ProfileContainer = () => {
    const dispatch = useDispatch()
    const {userId}= useParams()
   

useEffect(() => {
    if(userId){
         dispatch(fetchUserPosts(userId))
         dispatch(fetchUser(userId))
         
    }
    else{
        console.log("failed")
    }
   console.log("testing")
}, [userId,dispatch])

// check follow

const classes = Styles()

return (
        <>
        
         <Paper className={classes.root} elevation={2}>
            <Outlet/>

         </Paper>
        </>
   )
}

export default ProfileContainer