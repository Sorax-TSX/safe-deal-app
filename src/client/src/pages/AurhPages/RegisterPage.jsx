import React from "react";

import TextInput from "../../components/TextInput";
import {Button, Form} from "react-bootstrap";
import { useHandleChange, useHandleSubmit } from "../../hooks/form.hook";

const initLocalState = {
    values: { login: '', email: '', password: ''},
    errors: {}
}

const RegisterPage = () => {
    const [formRegister, setRegisterData] = React.useState(initLocalState);

    const handleChange = useHandleChange([formRegister, setRegisterData]);
    const handleSubmit = useHandleSubmit([formRegister, setRegisterData]);

    const {values, errors} = formRegister;
    return (
      <Form className="form-auth" onSubmit={handleSubmit((form) => {
          console.log(form)
      })}>
          <Form.Group>
              <TextInput
                type="text"
                name="login"
                value={values.login}
                error={errors.login}
                placeholder="Login"
                autoComplete="off"
                onChange={handleChange}
              />
          </Form.Group>
          <Form.Group>
              <TextInput
                type="email"
                name="email"
                value={values.email}
                error={errors.email}
                placeholder="Enter Email"
                autoComplete="off"
                onChange={handleChange}
              />
          </Form.Group>
          <Form.Group>
              <TextInput
                type="password"
                name="password"
                value={values.password}
                error={errors.password}
                placeholder="Password"
                autoComplete="off"
                onChange={handleChange}
              />
          </Form.Group>
          <Button variant="info" type="submit">Sing Up</Button>
      </Form>
    )
}

export default RegisterPage;
