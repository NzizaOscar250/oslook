import { Paper,CircularProgress } from "@material-ui/core"

const Loading = ({title}) => {
  return (
    <Paper component="div" elevation={0} style={{display:'flex',background:'transparent',minHeight:500,alignItems:'center',justifyContent:'center',padding:50}}>
       <div color="primary" style={{display:'flex',gap:10,fontWeight:600,background:'white',borderRadius:8,padding:10}}>
          <span>...{title} </span> <CircularProgress size={20}/>
       </div>
    </Paper>
  )
}

export default Loading