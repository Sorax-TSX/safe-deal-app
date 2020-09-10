import React from "react";

import { Form, Button } from "react-bootstrap";

import "./Auth.scss";

const LoginPage: React.FC = () => {
   return (
     <Form className="form-auth">
         <Form.Group controlId="formBasicEmail">
             <Form.Control type="text" placeholder="Enter login" />
         </Form.Group>
         <Form.Group controlId="formBasicPassword">
             <Form.Control type="password" placeholder="Password" />
         </Form.Group>
         <Button variant="info" type="submit">Submit</Button>
     </Form>
   )
}

export default LoginPage;
