import '../styles/Navbar.css';
import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import NavDrawer from "./NavDrawer";
import { UserContext } from "../contexts/UserContextProvider";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {ThemeContext} from '../contexts/ThemeContextProvider';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {useLocation} from 'react-router-dom';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const {theme} = useContext(ThemeContext);
  const location = useLocation();
  const firstPath = location.pathname.split('/')[1];
  const isHome = firstPath === "";
  const isBlog = firstPath === "blog";
  const isShop = firstPath === "shop";
  const isForum = firstPath === "forum";

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
          <Nav.Link href="/"><p className={"navLink" + (isHome ? " active" : "")}>Home</p></Nav.Link>
          <Nav.Link href="/blog"><p className={"navLink" + (isBlog ?" active" : "")}>Blog</p></Nav.Link>
          <Nav.Link href="/forum"><p className={"navLink" + (isForum ? " active" : "")}>Forum</p></Nav.Link>
          <Nav.Link href="/shop"><p className={"navLink" + (isShop ? " active" : "")}>Shop</p></Nav.Link>
        </Nav>
        <Nav className="mr-auto" />
        {user !== null ? (
          <div style={{right:"1%", textAlign:"right", width:"30%"}}>
            <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
            <Navbar.Text style={{ marginLeft: "4%" }}>
              <Link to="/" onClick={() => {
                  setUser(null);
              }}>
                Logout
              </Link>
            </Navbar.Text>
          </div>
          ) : (
            <Link to="/login">
              <MuiThemeProvider theme={theme}>
                <Button variant="contained" color="secondary">Log in</Button>
              </MuiThemeProvider>
            </Link>
          )
        }
      </Navbar.Collapse>
    </Navbar>
  );
}
