import {Fragment} from 'react';
import "./styles/App.css";
import Login from "./components/Login";
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContextProvider";
import Paper from '@material-ui/core/Paper';
import MerchInfo from './MerchInfo/MerchInfo';

function App() {
  return (
    <Fragment>
      <Paper></Paper>
      <Router>
      <UserContextProvider>
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/item" component={MerchInfo}></Route>
        </Switch>
      </UserContextProvider>
    </Router>
    </Fragment>
  );
}

export default App;
