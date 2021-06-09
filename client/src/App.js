import "./styles/App.css";
import Login from "./components/Login";
import Landing from "./components/Landing";
import MerchandisePage from "./components/MerchandisePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import {BlogDash, ForumDash} from './components/PostComponents/PostDashes';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div id="bodyColor"></div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/store" component={MerchandisePage}></Route>
          <Route path="/blog" component={BlogDash}></Route>
          <Route path="/forum" component={ForumDash}></Route>
        </Switch>
        <Footer />
      </UserContextProvider>
    </Router>
  );
}

export default App;
