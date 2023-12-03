import { Paper, Typography, makeStyles } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { Copyright } from "@material-ui/icons";


const Styles = makeStyles(theme =>({
paper:{
    margin:0,
    width:'100%',
    bottom:0 ,
    position:'relative',
    left:0,
    background:indigo[900],
    color:indigo[100],
    fontSize:12,
    textAlign:'center',
    paddingBlock:5 ,
    borderRadius:0 
},
fonts:{
    fontSize:'12px'
}
}))

export default function FooterSec(){

const classes = Styles()


return (
    <>
    <div className={classes.paper} >
         <Typography variant="body2" className={classes.fonts}>
         &copy; {new Date().getFullYear()} All right is reserved by <b>STARDEV</b>         </Typography>
         <Typography variant="body2" className={classes.fonts}>
            -Nziza Oscar- ceo and co-founder of STARDEV
         </Typography>

    </div>
    
    </>
)


}