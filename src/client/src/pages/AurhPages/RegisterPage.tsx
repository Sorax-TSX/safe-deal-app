import React from "react";
import {Button, Form} from "react-bootstrap";

const RegisterPage: React.FC = () => {
    return (
      <Form className="form-auth">
          <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter login" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password repeat" />
          </Form.Group>
          <Button variant="info" type="submit">Submit</Button>
      </Form>
    )
}

export default RegisterPage;
