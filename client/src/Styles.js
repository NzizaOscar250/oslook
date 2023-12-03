import { alpha, makeStyles } from "@material-ui/core";
import { grey, red, indigo } from "@material-ui/core/colors";
const Styles = makeStyles(theme => ({
    followBtn:{
        background:indigo[600],
        color:'#fff',
        '&:hover':{
            background:indigo[700]
        }
    },
    unfollowBtn:{
        background:red[600],
        color:'#fff',
        marginLeft:5,
        '&:hover':{
            background:red[500]
        }
    },
    gridList:{
        display:'flex',
        justifyContent:'evenly'
    },
    submit:{
        width:"100%",
        textAlign:'center'
    },
    avatarIcon:{
        textAlign:'center',
        
    },
    textField:{
        width:"100%"
    },
    link:{
        textDecoration:'none',
        fontWeight:600
    },
    cardHeader:{
        backgroundColor:grey[100],
    },
    card: {
        maxWidth: 800,
        minHeight:1400,
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingTop:20,
        borderRadius:0,
        background:'transparent'
       

        },
        card2: {
            maxWidth: 800,
            margin: 'auto',
            borderRadius:0,
            background:'transparent'
    
            },
        title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px
       ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        textAlign:'center'
    
        },
    root: {
        flexGrow: 1
    },
    searchicon:{
        [theme.breakpoints.up('md')]:{
            display:'none'
        }
    },
    search:{
        display:'flex',
        
        alignItems:'center',
        position:'relative',
        borderRadius:theme.shape.borderRadius,
        backgroundColor:alpha(theme.palette.common.white,0.15),
        width:'30%',
        paddingInlineStart:5,
        [theme.breakpoints.down('sm')]:{
            width:'60%',
            display: (props)=>props.open ? 'flex':'none'
        }
    },
    input:{
        color:'#fff',
        flex:1
    },
    AppBar:{
        marginTop:20
    },
    toolBar:{
        display:'flex',
        justifyContent:'space-around',
    },
    flex: {
        
        fontWeight:700
    },
    icons:{
     
        gap:20,
        justifyContent:'space-around',
        alignItems:'center',
        [theme.breakpoints.up('sm')]:{
            display:'flex'
        },
        [theme.breakpoints.down('sm')]:{
            display:(props)=>props.open ? 'none' :'flex'
        }
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.up('sm')]:{
            display:'none'
        }
    },
    menu:{
        width:theme.spacing(100),
        marginTop:30,
        marginLeft:-10,
        
    },
    toolbarMargin: {
        margin:100
    },
    responsive:{
        [theme.breakpoints.down('xs')]:{
            display:'none'
        },
        
    },
    
    }));


    export default Styles