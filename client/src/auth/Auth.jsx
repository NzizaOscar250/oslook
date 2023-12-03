import Styles from "../Styles"
import { Outlet } from "react-router-dom"
import { Paper } from "@material-ui/core"
const Auth = () => {
    const classes = Styles()
  return (
    <Paper className={classes.card} elevation={0}>
        <Outlet/>
    </Paper>
  )
}

export default Auth