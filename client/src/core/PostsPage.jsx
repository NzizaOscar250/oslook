
import { Avatar,CardHeader, LinearProgress, Paper, makeStyles } from "@material-ui/core"
import {Card,Typography} from "@material-ui/core"
import { grey, indigo } from "@material-ui/core/colors"
import Posts from "../posts/Post"
import { useDispatch, useSelector } from "react-redux"
import NewFeeds from "../components/NewFeeds"
import { useEffect } from "react"
import { fetchPost } from "../actions/posts"
import { Link } from "react-router-dom"
const useStyles = makeStyles(theme => ({
    card: {
    maxWidth: 600,
    margin: 'auto',
    },
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
   ${theme.spacing(2)}px`,
   paddingTop:10,
    color: indigo[500]
    },
    cardHeader:{
        background:grey[100]
    },
    media: {
    minHeight: 400
    }
   }))
const PostsPage = () => {
    
    const classes = useStyles();
    const {Auth,Loading:loading,Posts:posts,Users} = useSelector((state)=>state)
    const dispatch = useDispatch()  
    useEffect(()=>{
       dispatch(fetchPost())
    },[dispatch])

    const user = Users.find((user)=>user._id === Auth.authData._id ?user: null )
   

  return (
    <>
    <Paper className={classes.card}>
            {loading && <LinearProgress/>}
            
            <Typography variant="h6" className={classes.title} color="primary">News Feed</Typography>
           
            
            
            <div style={{background:grey[400],paddingBlock:15}}>
            <Card elevation={0} style={{width:'90%',margin:'auto'}}>
                <CardHeader
                    avatar={
                        
                        <Avatar src={user?.profile} alt="not found" style={{ width:50,height:50}}/>
               
                    }
                    title={(
                            <Typography 
                                component={Link} 
                                to={`/profile/${user?._id}`} 
                                style={{textTransform:'capitalize',fontWeight:'bold',color:'dodgerblue',textDecoration:'none'}}>
                                    
                                {user?.username}
                            </Typography>
                            )
                        }
                    subheader={
                        (
                            <Typography variant="body2" color="secondary">
                               You
                            </Typography>
                    
                        )
                    }
                    className={classes.cardHeader}
                    
                    />
           
                    <NewFeeds/> 


             
                </Card>

            </div>

            
        <div style={{width:'90%',margin:'auto',paddingBlock:20}}>
        
        <Posts posts={posts} profile={user?.profile} user={user?._id}/>

          {/* <LinearProgress aria-busy={true} aria-label="Loading.."
           aria-rowspan={3}/> */}

           
         </div>
        </Paper>
    </>
  )
}

export default PostsPage