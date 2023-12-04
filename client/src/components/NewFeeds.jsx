import { CardContent,TextField,IconButton,makeStyles,Button } from "@material-ui/core"
import { useState } from "react"
import { CameraAltRounded } from "@material-ui/icons"
import { useDispatch } from "react-redux"
import { createPosts } from "../actions/posts"

import { useRef } from "react"
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
    const fileInputRef = useRef(null);

    const handleChange =name=>e=> {
        
        setFeeds({...feeds,[name]:e.target.value})

    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
      
        if (file) {
          const reader = new FileReader();
      
          reader.onloadend = () => {
            // `reader.result` contains the base64-encoded file data
             setFeeds({...feeds,photo:reader.result})
          };
      
          // Read the file as a data URL
          reader.readAsDataURL(file);
        }
      };

      const handleHiddenInputClick = () => {
        fileInputRef.current.click();
      };
      

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(createPosts(feeds))
       setFeeds({text:'',photo:''})

       
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
                             {/* {feeds.photo && <Avatar/>}
                           
      
 */}

                           <div className={classes.avatarIcon}>
                            <input accept="image/*" type="file"
                            style={{display:'none'}}
                        
                            ref={fileInputRef}
                           
                            onChange={handleFileChange}

                            />
                            
                            

          <IconButton  color="secondary" 
                 style={{paddingInline:0,margin:0}}
                 component="span"
                 onClick={handleHiddenInputClick}
                 >
                                <CameraAltRounded/>
                            </IconButton>
                           
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

