import { Avatar, CardHeader,Card,Menu, MenuItem, IconButton,
    TextField, CardContent, Typography, Button, Paper } from "@material-ui/core"
import Styles from "../Styles"
import avatar from "../assets/img/avatar.png"
import { CommentRounded, Delete, FavoriteBorderRounded, FavoriteRounded, 
     MoreVertRounded, SendRounded } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {addComment, likePost, unLikePost} from "../actions/posts"
import moment from "moment/moment"
import { grey } from "@material-ui/core/colors"



const DropMenu = ({anchor,onClose,isOpen,postId,removePost})=>{
    
return (
    <>
    <Menu anchorEl={anchor}
              open={isOpen}
          elevation={0}
          style={{marginLeft:-110,marginTop:20,
            paddingTop:0}}
          color="default"
            
          
        > 
        <Paper component="div" style={{paddingInline:8}}>

            <MenuItem onClick={onClose} 
                style={{background:grey[200]}}>
                <Button color='default'
                 endIcon={<Delete color="secondary"/>}
                 size="small"
                 onClick={(e)=>{
                    e.stopPropagation()
                    removePost(postId)
                 }}  
                 fullWidth
                 >
                    Delete
                </Button>
            </MenuItem>
            <MenuItem 
            onClick={(e)=>{
                e.stopPropagation()
                onClose()
             }}
             
            >
                Close
            </MenuItem>
            
            </Paper>
        </Menu>
    </>
)
}

// _________________________________________comment Body________________________




export default function Posts({posts}){
const classes = Styles()
const [showComment,setShowComment]=useState()
// const posts = useSelector((state)=>state.Posts)
const dispatch = useDispatch();

const [menu, setMenu] =  useState({open:false,anchor:null})

    const Toggle=function(e){
     setMenu({open:!menu.open,anchor:e.target})
    }
    const onClose = ()=>{
        setMenu({open:false,anchor:null})
    }
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
    console.log(data)

    }
    else{
        console.log('error onliking')
    }
}

const handleDelete =(id)=>{

}

   return (
    <>
      {
        (posts.length)&&(
            <>    {
                    posts.map((post)=>
                    (<Card  style={{marginBlock:10,position:'relative'}} key={post._id}>
            <DropMenu 
                isOpen={menu.open}
                anchor={menu.anchor} 
                onClose={onClose}
                postId={post._id}
                removePost={handleDelete}
            />

                        <CardHeader
                            avatar={
                                <Avatar src={avatar}/>
            
                            }
                            
                            action={
                                
                                    <IconButton onClick={Toggle}>
                                         <MoreVertRounded/>
                                    </IconButton>
                                
                            }
                            title={<Link to={`/profile/${post.postedBy._id}`}
                             className={classes.link} style={{textTransform:'capitalize'}}>{post.postedBy.username}</Link>}
                            subheader={moment(post.createdAt).fromNow()}
                            className={classes.cardHeader}
                           
                            />
            
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
                    <Avatar style={{width:30,height:30}}/>
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
                    <Avatar  style={{width:30,height:30}}/>
                }
                title={    
                    
                    
                    <p style={{background:'white',padding:10,borderRadius:'8px'}}>
                        <Link to={`/profile/${item.postedBy._id}`} className={classes.link}
                         color="primary">{item.postedBy.username}</Link>
                        <br/>
                         <span style={{textTransform:'capitalize',fontSize:'12px'}}>{item.text}</span>
                        <span style={{display:'flex',justifyContent:'left',gap:4,alignItems:'center'}}>
                            {moment(item.createdAt).fromNow()}
                            
                            <IconButton size="small">
                                <Delete />
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