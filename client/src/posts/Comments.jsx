import { Avatar, Card, CardContent, CardHeader, IconButton, Paper, TextField, Typography } from "@material-ui/core";
import Styles from "../Styles"
import { Link } from "react-router-dom";
import { Delete, SendRounded } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";


const CommentBody=  item =>{
    const classes = Styles();
    return (
        <p style={{background:'white',padding:10,borderRadius:'8px'}}>
                <Link to='/profile' className={classes.link} color="primary">John Doe</Link>
                <br/>
                Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Cumque repellat 
                iste deleniti, rem quam eveniet.
                <span style={{display:'flex',justifyContent:'left',gap:4,alignItems:'center'}}>
                    {new Date().toDateString()}
                    <span>|</span>
                    <IconButton>
                        <Delete/>
                    </IconButton>
                </span>
        </p>
    )
}

export default function Comments(props){
const classes = Styles();

const [comment,setComment]= useState({text:''})



const addComment = event=>{
    if(event.keyCode == 13 && event.target.value){
        console.log(props.postId)
    }
}

    return (
    <>
        
            <CardHeader 
                avatar={
                    <Avatar src={props.avatar} style={{width:30,height:30}}/>
                }
                title={
                    <Paper style={{paddingInline:5}}>
                            <TextField
                                multiline
                                placeholder="Write Something....."
                                margin="normal"
                                fullWidth
                                maxRows={4}
                                required
                                onKeyDown={addComment}
                                value={comment.text}
                                onChange={(e)=>setComment({...comment,text:e.target.value})}
                            />
                           
                                {/* <IconButton size="small" color="primary" type="submit">
                                    <SendRounded/>
                                </IconButton>

                        </form> */}
                    </Paper>


                }
               
                className={classes.cardHeader}
                />

       
                    <CardHeader 
                        avatar={
                            <Avatar src={props.avatar} style={{width:30,height:30}}/>
                        }
                        title={     CommentBody() }
                        style={{margin:10,padding:0}}
                        />
              
              
              <CardHeader 
                        avatar={
                            <Avatar src={props.avatar} style={{width:30,height:30}}/>
                        }
                        title={     CommentBody() }
                        style={{margin:10,padding:0}}
                        />
                

        
    </>)
}