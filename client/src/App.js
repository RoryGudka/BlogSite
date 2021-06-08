import "./styles/App.css";
import Login from "./components/Login";
import Landing from './components/Landing';
import {BlogDash, ForumDash} from './components/PostComponents/PostDashes';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";
import ThemeContextProvider from './contexts/ThemeContextProvider';
import Navbar from './components/NavBar';
import Signup from './components/Signup';

function App() {
  return (
      <Router>
        <ThemeContextProvider>
          <UserContextProvider>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Landing}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route path="/blog" component={BlogDash}></Route>
              <Route path="/forum" component={ForumDash}></Route>
            </Switch>
          </UserContextProvider>
        </ThemeContextProvider>
    </Router>
  );
}

export default App;
