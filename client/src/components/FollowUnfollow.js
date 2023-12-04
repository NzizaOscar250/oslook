import { Button } from "@material-ui/core"
import { followUser, unFollowUser} from "../actions/users"
import { useDispatch } from "react-redux"
import {  makeStyles } from "@material-ui/core";
import {red, indigo } from "@material-ui/core/colors";

const Styles = makeStyles(theme => ({
    followBtn:{
        background:indigo[600],
        color:'#fff',
        '&:hover':{
            background:indigo[700]
        }
    },
    unfollowBtn:{
        background:red[600],
        color:'#fff',
        marginLeft:5,
        '&:hover':{
            background:red[500]
        }
    }
}))

const FollowUnfollow = ({following,userId,loading}) => {
    const classes = Styles()
    const dispatch = useDispatch()
    
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
    
    if (following){
         return (<Button className={classes.unfollowBtn}  
         variant="contained"
         onClick={handleFollow('UNFOLLOW',userId)}
         disableElevation>unfollow</Button>) 
    }
    else{
        return ( <Button className={classes.followBtn}
        variant="contained"
        onClick={handleFollow('FOLLOW',userId)}
        disableElevation>Follow</Button>)
    }
    // else{
    //     return <CircularProgress size={12}/>
    // }
  
}

export default FollowUnfollow