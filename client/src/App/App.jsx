import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect} from "react-router-dom";

import { loadUser } from "../store/actions/auth.action";
import alertAction from "../store/actions/alert.action";

import store from "../store";

import GuestRoute from "../routing/GuestRoute";
import PrivateRoute from "../routing/PrivateRoute";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/AurhPages/LoginPage";
import RegisterPage from "../pages/AurhPages/RegisterPage";
import MessageAlert from "../components/Alert";
import Loader from "../components/Loader";

import "./App.scss";

const App = () => {
    const alert = useSelector(state => state.alert);
    const auth = useSelector(state => state.auth);
    const loading = useSelector(state => state.auth.loadUser);

    React.useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(alertAction.clear());
    }, []);

    return (
      <>
          { loading && <Loader />}
          <Navbar auth={auth} />
              <main className="container content">

                  {alert.message && <MessageAlert severity={alert.type} message={alert.message}/>}

                  <Switch>

                      <Route exact path="/" component={ Home }/>

                      <GuestRoute exact path="/login" component={ LoginPage }/>

                      <GuestRoute exact path="/register" component={ RegisterPage }/>

                      <Redirect from="*" to="/" />

                  </Switch>
              </main>
          <Footer/>
      </>
    );
}

export default App;
