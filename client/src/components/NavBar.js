import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import NavDrawer from "./NavDrawer";
import { UserContext } from "../contexts/UserContextProvider";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {ThemeContext} from '../contexts/ThemeContextProvider';
import {MuiThemeProvider} from '@material-ui/core/styles';

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const {theme} = useContext(ThemeContext);

  console.log('test');
  return (
    <Navbar expand="lg" variant="dark" style={{backgroundColor:"var(--Primary)"}}>
      <Navbar.Brand>
        <img
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/d/d8/SDS_UCSantaCruz_RedwoodSlug_WhiteGround.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <Link
          to="/home"
          style={{ textDecoration: "none" }}
          className="text-dark"
        >
          Camille's Corner
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
          <Nav.Link href="/forum">Forum</Nav.Link>
          <Nav.Link href="/shop">Shop</Nav.Link>
        </Nav>
        <Nav className="mr-auto" />
        {user !== null ? (
          <div>
            <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
            <Navbar.Text style={{ marginLeft: "2%" }}>
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
