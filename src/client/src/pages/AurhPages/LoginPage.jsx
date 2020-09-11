import * as React from "react";

import { Form, Button } from "react-bootstrap";
import TextInput from "../../components/TextInput";
import { useHandleChange, useHandleSubmit } from "../../hooks/form.hook";

import "./Auth.scss";

const LoginPage = () => {
    const [loginData, setLoginData] = React.useState({
        values: {login: '', password: ''},
        errors: {}
    });

    const handleChange = useHandleChange([loginData, setLoginData]);
    const handleSubmit = useHandleSubmit([loginData, setLoginData]);

    const {values, errors} = loginData;
    return (
      <Form className="form-auth" onSubmit={handleSubmit((form) => {
          console.log(form)
      })}>
          <TextInput
            type="text"
            name="login"
            value={values.login}
            error={errors.login}
            placeholder="Login"
            autoComplete="off"
            onChange={handleChange}
          />
          <TextInput
            type="password"
            name="password"
            value={values.password}
            error={errors.password}
            placeholder="Password"
            autoComplete="off"
            onChange={handleChange}
          />
          <Button variant="info" type="submit">Sing In</Button>
      </Form>
    )
};

export default LoginPage;

