import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import {Card,CardContent,Typography,CardActions,Button,Icon} from "@material-ui/core"
import { Link, useNavigate} from "react-router-dom"
import star from "../assets/img/star.png"
import { indigo } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { signUp } from '../actions/auth';

const useStyles = makeStyles(theme => ({
    card: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(5),
    paddingBlock:20
    },
    title: {
//     padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
//    ${theme.spacing(2)}px`,
    color: indigo[600],
    fontWeight:600,
    textAlign:'center',
    


    },
    title2: {
        color: indigo[600],
        fontWeight:600,
        textAlign:'center'
    
        },
    textField:{
        width:"100%",
      },
      submit:{
        background:indigo[500],
        color:'white',
        '&:hover':{
            background:indigo[600]
        }
      },
      header:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:0,
        paddingBottom:`${theme.spacing(3)}px`
      },
    media: {
    minHeight: 400
    }
   }))
export default function Signup() {
const classes = useStyles();
const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
    })
const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
   }
   
const navigate = useNavigate();
const dispatch = useDispatch()

const clickSubmit = () => {
    const user = {
    username: values.name || undefined,
    email: values.email || undefined,
    password: values.password || undefined
    }
    
    dispatch(signUp(user,navigate))

}

return (
<Card className={classes.card} elevation={0}>
 <CardContent>
           <div className={classes.header}>
                <img src={star} alt="not found" width="50px"/>
                <Typography variant="h6" className={classes.title2}>
                    StarDev
                </Typography>
             </div>
        <Typography variant="h5" className={classes.title}>
            Signup 
        </Typography>
 <Typography component="p" style={{paddingBlock:5}}>
    Signup to continue to our application
 </Typography>
 <TextField id="name" 
 label="Enter username"
 className={classes.textField}
 value={values.name} 
 onChange={handleChange('name')
}
 margin="normal"/>
 <br/>
 <TextField id="email" type="email" label="Enter email"
 className={classes.textField}
 value={values.email} onChange={handleChange('email')}
 margin="normal"/>
 <br/>
 <TextField id="password" type="password" label="Enter password"
 className={classes.textField} value={values.password}
 onChange={handleChange('password')} margin="normal"/>
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
className={classes.submit}
fullWidth
disableElevation
>Signup</Button>
 
 </CardActions>
 <Typography style={{paddingInline:10}}>
    Already have an account?<Link to='/auth/signin'>Signin</Link>
 </Typography>
 
 </Card>

);
}
