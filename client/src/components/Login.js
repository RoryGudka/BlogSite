import "../styles/Login.css";
import { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { UserContext } from "../contexts/UserContextProvider";

const Login = (props) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user !== null ? user.uid : "");
  const [password, setPassword] = useState("");
  const token = user !== null ? user.token : undefined;

  const getDots = (password) => {
    let hidden = "";
    for (let i = 0; i < password.length; i++) {
      hidden += "•";
    }
    return hidden;
  };
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    if (val.length < password.length)
      setPassword(password.substring(0, val.length));
    else setPassword(password + val.substring(val.length - 1));
  };

  const handleLogin = (e) => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUser({
            username,
            token: res.data.token,
          });
          history.push("/home");
        } else alert(res.data.message);
      })
      .catch((err) => {
        alert("There was an error");
      });
  };

  const handleLogout = (e) => {
    setUser(null);
  };

  return (
    <div>
      <Fragment>
      <img
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "70%",
          height: "100vh",
          objectFit: "cover",
          filter: "brightness(50%)",
        }}
        src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
      />
      <div
        style={{
          backgroundColor: "rgb(0,0,0,0.2)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "70%",
          height: "100%",
        }}
      />
      <p
        style={{
          position: "fixed",
          top: "33%",
          left: "10.8%",
          width: "40%",
          fontSize: "60px",
          fontFamily: "Fantasy",
          color: "#003399",
        }}
      >
        Thomas Jefferson Elementary
      </p>
      <p
        style={{
          color: "white",
          position: "fixed",
          top: "33%",
          left: "11%",
          width: "40%",
          fontSize: "60px",
          fontFamily: "Fantasy",
        }}
      >
        Thomas Jefferson Elementary
      </p>
      <p
        style={{
          color: "#003399",
          position: "fixed",
          top: "63%",
          left: "7.8%",
          width: "70%",
          fontSize: "35px",
          fontFamily: "Fantasy",
        }}
      >
        Positivity, Respect, Diversity, Education, and Comradery
      </p>
      <p
        style={{
          color: "white",
          position: "fixed",
          top: "63%",
          left: "8%",
          width: "70%",
          fontSize: "35px",
          fontFamily: "Fantasy",
        }}
      >
        Positivity, Respect, Diversity, Education, and Comradery
      </p>
      <Paper
        style={{
          zIndex: 3,
          position: "fixed",
          left: "70%",
          top: 0,
          width: "30%",
          height: "100vh",
        }}
        elevation={20}
      >
        <div id="signinWrapper">
        <Paper
            style={{
              display: "inline-block",
              width: "80%",
              margin: "40px 0",
              padding: "15px 5px",
              top: "13vh",
            }}
            elevation={3}
          >
            <p style={{ fontSize: "26px", margin: "20px 0" }}>
              Login to Admin Portal
            </p>
            <div className="use-passWrapper">
              <TextField
                style={{ margin: "10px 0" }}
                variant="outlined"
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br></br>
            <div className="use-passWrapper">
              <TextField
                style={{ margin: "10px 0" }}
                variant="outlined"
                fullWidth
                label="Password"
                value={getDots(password)}
                onChange={handlePasswordChange}
              />
            </div>
            <div id="loginBtnWrapper">
              <Button
                style={{ width: "150px", height: "50px", borderRadius: "25px" }}
                variant="contained"
                color="primary"
                onClick={token !== undefined ? handleLogout : handleLogin}
              >
                {token !== undefined ? "Log out" : "Log in"}
              </Button>
            </div>
          </Paper>
        </div>
      </Paper>
    </Fragment>
    </div>
  );
};

export default Login;