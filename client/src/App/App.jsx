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
import MessageAlert from "../components/Alert";
import Loader from "../components/Loader";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Balance from "../pages/Balance/Balance";
import OrderList from "../pages/Deals/DealsList";
import OrderCreate from "../pages/Deals/OrderNew";
import Order from "../pages/Deals/Order";


import "./App.scss";

const App = () => {
    const stateSelector = useSelector(state => ({
        alert: state.alert,
        auth: state.auth,
        loading: state.loadUser
    }));

    React.useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(alertAction.clear());
    }, []);

    const { alert, auth, loading } = stateSelector;

    return (
      <>
          { loading && <Loader />}
          <Navbar auth={auth} />
              <main className="container content">

                  {alert.message && <MessageAlert severity={alert.type} message={alert.message}/>}

                  <Switch>

                      <Route exact path="/" component={ Home }/>

                      <GuestRoute exact path="/login" component={ Login }/>

                      <GuestRoute exact path="/register" component={ Register }/>

                      <PrivateRoute exact path="/deals" component={ OrderList } />

                      <PrivateRoute exact path="/deals/new" component={ OrderCreate } />

                      <PrivateRoute exact path="/deals/order/:id" component={ Order } />

                      <PrivateRoute exact path="/balance" component={ Balance } />

                      <Redirect from="*" to="/" />

                  </Switch>
              </main>
          <Footer/>
      </>
    );
}

export default App;
