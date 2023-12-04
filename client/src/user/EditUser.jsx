import { useEffect, useRef, useState } from "react";
import { Button ,TextField,Card,CardContent,Typography,CardActions, Avatar} from "@material-ui/core";
import Styles from "../Styles";
import {  CloudUpload } from "@material-ui/icons";
import {Icon} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../actions/users";
export default function EditUser(){
const classes = Styles()
const fileInputRef = useRef(null);
const {userId} = useParams()
const dispatch = useDispatch();
const Users= useSelector((state)=> userId ? state.Users.find((u)=>u._id === userId) : null)

const [values, setValues] = useState({
    username: '',
    profile:'',
    password: '',
    email: '',
    about:'',
    })


useEffect(() => {
    setValues({...values,...Users})
},[Users])

const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
   }
   
   
const clickSubmit = () => {
    const formData = {
    username: values.username || undefined,
    email: values.email || undefined,
    password: values.password || undefined,
    profile: values.profile || null,
    about:values.about || undefined
    }

    dispatch(updateProfile(userId,formData))

}


const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      // `reader.result` contains the base64-encoded file data
       setValues({...values,profile:reader.result})
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
};

const handleHiddenInputClick = () => {
  fileInputRef.current.click();
};


    return(<>
        
            <form>

<Card style={{width:'50%',margin:'auto',padding:10}}>
 <CardContent>
 <Typography variant="h5" className={classes.title}>
      Edit Profile
 </Typography>
 
 <div className={classes.avatarIcon}>
    <Avatar  src={values.profile && values.profile } style={{width:80,height:80,margin:'5px auto',border:'2px solid grey'}}/>
        
    
    <div>
      {/* Hidden input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>


<Button variant="contained" color="secondary"
  onClick={handleHiddenInputClick}  >
<span style={{paddingInline:10}}> Choose Picture  </span><CloudUpload/>
 </Button>

 </div>

<br /><br />

 <TextField
    id="about"
    multiline 
    maxRows={5} 
    label="About"
    className={classes.textField} 
    value={values.about}
    onChange={handleChange('about')}
    margin="normal"
    variant="outlined"
 />

 <br/>
 <TextField id="name" 
 label="Change username"
 className={classes.textField}
 value={values.username} 
 onChange={handleChange('username')
}
variant="outlined"
 margin="normal"/>
 <br/>
 <TextField id="email" type="email" label="Change email"
 className={classes.textField}
 value={values.email} onChange={handleChange('email')}
 margin="normal"
 variant="outlined"
 />
 <br/>
 <TextField id="password" type="password" label="Change password"
 className={classes.textField} value={values.password}
 onChange={handleChange('password')} margin="normal"
 variant="outlined"
 />
 <br/>
 {
 values.error && (<Typography component="p" color="error">
 <Icon color="error"
className={classes.error}>error</Icon>
 {values.error}</Typography>)
 }
 </CardContent>
 <CardActions>
 <Button color="primary" variant="contained"
onClick={clickSubmit}
 className={classes.submit}>Send</Button>
 </CardActions>
 </Card>
            </form>
        
   </>)
}