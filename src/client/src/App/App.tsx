import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Home from "../pages/Home/Home";
import LoginPage from "../pages/AurhPages/LoginPage";
import RegisterPage from "../pages/AurhPages/RegisterPage";


import "./App.scss";

const App: React.FC = () => {
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
