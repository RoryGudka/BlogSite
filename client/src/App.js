import "./styles/App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <Switch>
          <Route path="/" exact component={<div></div>}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;
