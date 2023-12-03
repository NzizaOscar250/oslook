import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import {Card,CardContent,Typography,CardActions,Button} from "@material-ui/core"
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signIn } from '../actions/auth';
import { useEffect } from 'react';
import {  indigo } from '@material-ui/core/colors';
import star from "../assets/img/star.png"

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
export default function Signin() {
        const classes = useStyles();
        const dispatch = useDispatch()
        const history = useNavigate()
        const users = useSelector((state)=>state.Auth)
    
        const [values, setValues] = useState({
            password: '',
            email: '',
            error: ''
            })
      
        
        const handleChange = name => event => {
            setValues({ ...values, [name]: event.target.value })
        }
        
        const clickSubmit = () => {
            const user = {
            email: values.email || undefined,
            password: values.password || undefined
            }
            dispatch(signIn(user,history))      
        }


        useEffect(()=>{
            setValues({...values,error:users.ERROR})
            
        },[users.ERROR])

 

return (
<Card className={classes.card} elevation={0}>
             <div className={classes.header}>
                <img src={star} alt="not found" width="50px"/>
                <Typography variant="h6" className={classes.title2}>
                    StarDev
                </Typography>
             </div>
 <CardContent>
     
 <Typography variant="h5" className={classes.title}>
    Hi, Welcome Back 
 </Typography>
 
 <Typography component="p" style={{paddingBlock:5}}>
    Sign in to continue to our application
 </Typography>

 {
 values.error && (<Typography variant='body2' color="error" style={{paddingBlock:10}}>
* {values.error}</Typography>)
 }

 <TextField id="email" type="email" label="Enter email"
 className={classes.textField}
 value={values.email} onChange={handleChange('email')}
 
 margin="normal"/>
 <br/>
 <TextField id="password" type="password" label="Enter password"
 className={classes.textField} value={values.password}
 onChange={handleChange('password')} margin="normal"/>


 </CardContent>
 <CardActions>
 <Button  variant="contained"
onClick={clickSubmit}
 className={classes.submit}
 fullWidth
disableElevation
 
 >Signin</Button>


 </CardActions>
 
<Typography component="div" style={{paddingInline:10}}>
    Don't have an account?
    <Link to='/auth/signup'>Signup</Link>
 </Typography>
 </Card>

);
}
