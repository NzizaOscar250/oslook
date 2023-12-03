import { CardContent,TextField,IconButton,makeStyles,Button,Avatar } from "@material-ui/core"
import { useState } from "react"
import { CameraAltRounded } from "@material-ui/icons"
import { useDispatch } from "react-redux"
import { createPosts } from "../actions/posts"
const useStyles = makeStyles(theme => ({
    
    title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
   ${theme.spacing(2)}px`,
   paddingTop:0,

    },
    
    
   }))
export default function NewFeeds(){
    
    const [feeds,setFeeds] = useState({text:'',photo:''})
    const dispatch = useDispatch()
  

    const handleChange =name=>e=> {
        
        setFeeds({...feeds,[name]:e.target.value})

    }
    const handleFileChange= (e)=>{
        console.log(e.target)
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onloaded = ()=>{
                setFeeds({...feeds,photo:reader.result})
                console.log(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(createPosts(feeds))
        setFeeds({text:'',photo:''})
        console.log(feeds)
       
    }
    const classes = useStyles()


    return (
        <form onSubmit={handleSubmit}>
    <CardContent style={{paddingInline:50}}>
    
         <TextField
                         multiline
                         fullWidth
                         maxRows={5}
                         color="primary"
                         required
                         helperText="e.g: To day is one the best days ever" size="small"
                         placeholder="Share Your Thoughts ....."
                         onChange={handleChange('text')}
                         value={feeds.text}
                         />
                             {feeds.photo && <Avatar/>}
                           <div className={classes.avatarIcon}>
                            <input accept="image/*" type="file"
                            style={{display:'none'}}
                            id="icon-button-file" 
                            value={feeds.photo}
                            onChange={handleFileChange}

                            />
                            
                            

                            <label htmlFor="icon-button-file">
          <IconButton  color="secondary" 
                 style={{paddingInline:0,margin:0}}
                 component="span"
                 >
                                <CameraAltRounded/>
                            </IconButton>
                            </label>
                        </div>
                        

                </CardContent> 
                <div className={classes.cardHeader} 
                style={{paddingBlock:10,paddingInline:10}}>
                        <Button variant="contained"
                         color="secondary" 
                         elevation={0} type="submit"> Post</Button>
                </div>
            </form>
    )
}

