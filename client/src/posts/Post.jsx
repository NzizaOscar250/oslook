import { Avatar, CardHeader,Card, IconButton,
    TextField, CardContent, Typography, Button, CircularProgress, CardMedia } from "@material-ui/core"
import Styles from "../Styles"
import { CommentRounded, Delete, FavoriteBorderRounded, FavoriteRounded,  SendRounded } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import {addComment, likePost, unLikePost,deletePost} from "../actions/posts"
import moment from "moment/moment"
import { grey } from "@material-ui/core/colors"




// _________________________________________comment Body________________________




export default function Posts({posts,profile,user}){
const classes = Styles()
const [showComment,setShowComment]=useState()
// const posts = useSelector((state)=>state.Posts)
const dispatch = useDispatch();

   
    const [comment,setText] = useState('')

const ToggleShowComment=()=>{
    setShowComment(!showComment)
}


const {Auth} = useSelector((state)=>state)

const handleLikes = (type,postId)=>event=>{
    event.preventDefault()
    event.stopPropagation()

    if(type === 'LIKE'){
        dispatch(likePost(postId))
    }else if (type === 'UNLIKE'){
        dispatch(unLikePost(postId))
    }
    else if(type === 'SEND_COMMENT'){
        const data = {
            comment,
            postId:postId
        }

       dispatch(addComment(data.postId,data.comment))
       setText('')

    }
    else if (type === 'DELETE_POST'){
        console.log(postId)
        dispatch(deletePost(postId))
    }
    else{
        console.log('error onliking')
    }
}



   return (
    <>
      {
        (posts.length)&&(
            <>    {
                    posts.map((post)=>
                    (<Card  style={{marginBlock:10,position:'relative'}} key={post._id}>


                        <CardHeader
                            avatar={
                            <IconButton style={{background: 'white',padding:0,width:50,height:50}}>
                                <Avatar src={post.postedBy?.profile} alt="not found"
                                 style={{ width:'100%',height:50}}/>
                             </IconButton> 
            
                            }
                            
                            action={
                                
                                 post.postedBy._id === user &&   <IconButton onClick={handleLikes("DELETE_POST",post._id)}>
                                         <Delete/>
                                    </IconButton>
                                
                            }
                            title={<Link to={`/profile/${post.postedBy._id}`}
                             className={classes.link} style={{textTransform:'capitalize'}}>{post.postedBy.username}</Link>}
                            subheader={moment(post.createdAt).fromNow()}
                            className={classes.cardHeader}
                           
                            />

                            {
                            post.photo && <CardMedia style={{width:'100%',height:400}} image={post.photo} title="testing"/>
                            }
                            <CardContent>
                              <Typography variant="body2">
                             {post.text}
                              </Typography>
                            </CardContent>
                            
                            <div>

                                {
                                    (post.likes.includes(Auth.authData._id))?(
                                        <Button color="secondary" onClick={  handleLikes('UNLIKE',post._id) }>
                                            <FavoriteRounded/>
                                            <Typography  
                                             component="span"
                                             style={{paddingInline:10,fontSize:'14px',color:grey[500]}}
                                             >
                                                 {post.likes.length}
                                            </Typography>
                                        </Button>
                               
                                
                                    ):(
                                        <Button color="secondary" 
                                        onClick={

                                                handleLikes('LIKE',post._id)
                                            }
                                            startIcon={ <FavoriteBorderRounded/>}
                                            
                                        >
                                           
                                            <Typography 
                                             component="span"
                                             style={{paddingInline:10,fontSize:'14px',color:grey[500]}}
                                             >
                                                {post.likes.length}
                                            </Typography>
                                        </Button>
                                    )
                                }
                                <IconButton color="secondary" onClick={ToggleShowComment}>
                                    <CommentRounded/>
                                    <Typography  
                                             component="span"
                                             style={{paddingInline:10,fontSize:'14px',color:grey[500]}}
                                             >
                                                {post.comments.length}
                                            </Typography>
                                </IconButton>
                            
                            </div>
            
                            
                            {/* comment section */}
                            
                            <div className={classes.cardHeader}>
                                     <CardHeader 
                avatar={
        
                            !profile ?<CircularProgress/>: <Avatar src={profile} alt="not found"
                                 style={{ width:30,height:30}}/>
                            
                }
                title={
                    <form onSubmit={handleLikes('SEND_COMMENT',post._id)}  style={{paddingInline:5,display:'flex',alignItems:'end',gap:5}}>
                            <TextField
                                multiline
                                placeholder="Write Something....."
                                margin="normal"
                                fullWidth
                                maxRows={4}
                                required
                                value={comment}
                                onChange={(e)=>setText(e.target.value)}
                               
                            />
                           
                                 <IconButton size="small" color="primary" type="submit"                                 >
                                    <SendRounded/>
                                </IconButton>

                     
                    </form>


                }
               
                className={classes.cardHeader}
                />

{/* ______________________comments__________ */}
       
       {
        post.comments.length !== 0 &&
         post.comments.map((item)=> item.text &&(
             <CardHeader 
              key={item._id}
                avatar={
                    <Avatar src={item.postedBy?.profile}  style={{width:30,height:30}}/>
                }
                title={    
                    
                    
                    <p style={{background:'white',padding:10,borderRadius:'8px'}}>
                        <Link to={`/profile/${item.postedBy._id}`} className={classes.link}
                         style={{color:'dodgerblue',display:'block'}}>{item.postedBy.username}</Link>
                       
                         <span style={{textTransform:'capitalize',fontSize:'14px',color:'grey',
                         paddingBlock:6,paddingInline:6,fontWeight:400,display:'block'}}>
                            {item.text}
                        </span>
                        
                        <span style={{display:'flex',justifyContent:'left',
                        gap:4,alignItems:'center',fontSize:13}}>
                            {moment(item.createdAt).fromNow()}
                            
                            <IconButton color="secondary" style={{padding:0}}>
                                <Delete style={{ fontSize:16}}/>
                            </IconButton>
                        </span>
                   </p>
                    
                 }
                style={{margin:10,padding:0}}
                />
         ))
         
           
       }

                    
              
              
              
                

                            </div>
                               
                            
                    </Card>   
                    )
                    )
                 }
              </>

         )
      
       
      }
   
    </>
)
}