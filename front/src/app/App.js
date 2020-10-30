import React from "react";
import { BrowserRouter, Route, Switch, withRouter, connect, mapStateToProps } from "react-router-dom";
import Home from "../components/Home";
import Inventory from "../components/Inventory";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginLogup from "../components/LoginLogup";
import Transactions from "../components/Transactions";
import Profile from "../components/Profile";
import Statistics from "../components/Statistics";
import "react-bootstrap/dist/react-bootstrap.min.js";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/loginlogup" component={LoginLogup} />
        <Route exact path="/statistics" component={Statistics} />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
export default withRouter(connect(mapStateToProps, { f, g })(App));
