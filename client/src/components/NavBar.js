import '../styles/Navbar.css';
import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import NavDrawer from "./NavDrawer";
import { UserContext } from "../contexts/UserContextProvider";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {useLocation} from 'react-router-dom';
import {useStyles} from '../styles/Button';
import UserAvatar from './UserAvatar';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const firstPath = location.pathname.split('/')[1];
  const isHome = firstPath === "";
  const isBlog = firstPath === "blog";
  const isShop = firstPath === "shop";
  const isUser = firstPath ==="user";
  const isForum = firstPath === "forum";
  const isAbout = firstPath === "about";
  const classes = useStyles();

  return (
    <Navbar expand="lg" variant="dark" style={{backgroundColor:"var(--Primary)"}}>
      <Navbar.Brand>
        <img
          alt=""
          src="https://www.pngjoy.com/pngl/414/7599121_coffee-top-view-coffee-cup-for-top-png.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <Link
          to="/"
          style={{ textDecoration: "none", marginLeft:"10px" }}
          className="text-dark"
        >
          <p id="navbarMain">Camille's Corner</p>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/"><p className={"navLink" + (isHome ? " active" : "")}>Home</p></Link></Nav.Link>
          <Nav.Link><Link to="/blog"><p className={"navLink" + (isBlog ?" active" : "")}>Blog</p></Link></Nav.Link>
          <Nav.Link><Link to="/forum"><p className={"navLink" + (isForum ? " active" : "")}>Forum</p></Link></Nav.Link>
          <Nav.Link><Link to="/shop"><p className={"navLink" + (isShop ? " active" : "")}>Shop</p></Link></Nav.Link>
          <Nav.Link><Link to="/user"><p className={"navLink" + (isUser ? " active" : "")}>Profile</p></Link></Nav.Link>
          <Nav.Link><Link to="/about"><p className={"navLink" + (isAbout ? " active" : "")}>About Me</p></Link></Nav.Link>
        </Nav>
        <Nav className="mr-auto" />
        {user !== null ? (
          <div style={{right:"1%", textAlign:"right", width:"30%"}}>
            <UserAvatar />
          </div>
          ) : (
            <Link to="/login">
              <Button variant="contained" classes={classes}>Log in</Button>
            </Link>
          )
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
