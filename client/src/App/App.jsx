import React from "react";
import {
    Switch,
    Route,
    BrowserRouter as Router} from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Home from "../pages/Home/Home";
import LoginPage from "../pages/AurhPages/LoginPage";
import RegisterPage from "../pages/AurhPages/RegisterPage";


import "./App.scss";

const App = () => {

    return (
      <Router>
          <NavBar/>
          <main className="container content">

              <Switch>

                  <Route exact path="/" component={Home}/>

                  <Route exact path="/login" component={LoginPage}/>

                  <Route exact path="/register" component={RegisterPage}/>

              </Switch>
          </main>
          <Footer/>
      </Router>
    );
}

export default App;
