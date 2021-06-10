import { Fragment, useContext, useState } from "react";
import {UserContext} from '../contexts/UserContextProvider';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import {useStyles} from '../styles/Button';


const UserAvatar = props => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <Fragment>
            <div style={{display:"inline-block", marginRight:"20px", verticalAlign:"top"}}>
                <p style={{fontSize:"18px", color:'white', marginBottom:"-5px"}}>{user.name}</p>
                <p style={{fontSize:"14px", color:'lightgrey', margin:0}}>@{user.username}</p>
            </div>
            <IconButton classes={classes} style={{verticalAlign:'top'}} onClick={handleClick}>
                <i className="fas fa-user"></i>
            </IconButton>
            {menuOpen && (
                <div id="userMenu">
                    <Link to="/user" onClick={() => setMenuOpen(false)}><p>Profile</p></Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)}><p>Shopping Cart</p></Link>
                    <Link to="/" onClick={() => {setMenuOpen(false);setUser(null)}}><p>Log out</p></Link>
                </div>
            )}
        </Fragment>
    )
}

export default UserAvatar;