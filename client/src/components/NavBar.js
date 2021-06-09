import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDrawer from "./NavDrawer";
import { UserContext } from "../Contexts/UserContextProvider";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#ffdb4d" }}>
      <NavDrawer />
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
          Thomas Jefferson Elementary School Portal
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
        <Navbar.Text style={{ marginLeft: "2%" }}>
          <Link
            to="/"
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
