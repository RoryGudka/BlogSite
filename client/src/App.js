import "./styles/App.css";
import Login from "./components/Login";
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";
import Navbar from './components/NavBar';

function App() {
  return (
      <Router>
      <UserContextProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </UserContextProvider>
    </Router>
  );
}

export default App;
