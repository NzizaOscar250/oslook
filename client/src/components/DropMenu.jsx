import { Menu, MenuItem, Typography } from "@material-ui/core"
import Styles from "../Styles"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signOut } from "../actions/auth"
export default function DropMenu({anchor,isOpen,onClose,userId}){

const classes = Styles()
const dispatch = useDispatch()
const navigate = useNavigate();

const {user} = JSON.parse(localStorage.getItem('profile'))


    return (
        <>
        <Menu anchorEl={anchor}
              open={isOpen}
           className={classes.menu}
        >    
            <MenuItem>
                <Typography component="p" style={{fontSize:12,fontWeight:600}}>Hi, {user?.username}</Typography>
            </MenuItem>
           
            <MenuItem  component={Link} to={`/profile/${user._id}`} onClick={onClose}>
              My Profile
            </MenuItem>
           

            <MenuItem onClick={
                (e)=>{
                    dispatch(signOut(navigate))
                    onClose()
                }
                }>Logout</MenuItem>

        </Menu>
        </>
    )
}