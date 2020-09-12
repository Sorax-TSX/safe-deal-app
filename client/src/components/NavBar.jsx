import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../store/actions/auth.action";
import store from "../store";

import {Container, Nav, Navbar} from "react-bootstrap";


const GuestNavBlock = () => (
  <Navbar.Collapse className="justify-content-end">
      <Link to="/login" className="navbar__login">Sign In</Link>
      <Link to="/register" className="navbar__register">Sign Up</Link>
  </Navbar.Collapse>
)

const UserNavBlock = ({name}) => {

  const handleClick = (event) => {
      event.preventDefault();
      store.dispatch(logoutUser());
  };

  return (
    <>
        <Link to="/deals" className="nav-link">My Deals</Link>
        <Link to="/balance" className="nav-link">Balance: 0.00 $</Link>
        <Nav.Link href="/logout" className="nav-link" onClick={handleClick}>Logout</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Signed in as: {name.toUpperCase()}</Navbar.Text>
        </Navbar.Collapse>
    </>
  )
}

const NavBar = ({auth}) => {
    return (
      <header>
          <Navbar bg="dark" variant="dark">
              <Container>
                  <Navbar.Brand><Link to="/">Safe Deal</Link></Navbar.Brand>
                  {auth && auth.isAuthenticated ? <UserNavBlock name={auth.user.login}/> : <GuestNavBlock/>}
              </Container>
          </Navbar>
      </header>
    )
};

export default NavBar;
