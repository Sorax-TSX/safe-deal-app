import React from "react";
import {Link} from "react-router-dom";

import {Container, Navbar} from "react-bootstrap";

const NavBar: React.FC = () => {
   return (
     <header>
        <Navbar bg="dark" variant="dark">
           <Container>
              <Navbar.Brand href="/">Safe Deal</Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                 <Link to="/login" className="navbar__login">Sign In</Link>
                 <Link to="/register" className="navbar__register">Sign Up</Link>
                 {/*Signed in as: <a href="#login">Mark Otto</a>*/}
              </Navbar.Collapse>
           </Container>
        </Navbar>
     </header>
   )
}

export default NavBar;
