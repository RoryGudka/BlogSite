import "./styles/App.css";
import Login from "./components/Login";
import Landing from "./components/Landing";
import MerchandisePage from "./components/MerchandisePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";
import Paper from "@material-ui/core/Paper";
import MerchInfo from "./components/MerchInfo/MerchInfo";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import About from "./components/About";
import ShoppingCart from "./components/ShoppingCart";
import { BlogDash, ForumDash } from "./components/PostComponents/PostDashes";
import UserPage from "./components/UserPage";
import ForumPostPage from "./components/ForumPostPage";
import BlogPostPage from "./components/BlogPostPage";
import CommentPage from "./components/CommentPage";
import BlogWrapper from "./components/BlogWrapper";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div id="bodyColor"></div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/item/:itemId" component={MerchInfo}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/cart" component={ShoppingCart}></Route>
          <Route path="/shop" component={MerchandisePage}></Route>
          <Route path="/blog" component={BlogWrapper}></Route>
          <Route path="/forum" component={ForumDash}></Route>
          <Route path="/forum_posts" component={ForumPostPage}></Route>
          <Route path="/blog_posts" component={BlogPostPage}></Route>
          <Route path="/comments" component={CommentPage}></Route>
          <Route path="/user" component={UserPage}></Route>
        </Switch>
        <Footer />
      </UserContextProvider>
    </Router>
  );
}

export default App;
