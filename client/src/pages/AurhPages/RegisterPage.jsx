import * as React from "react";

import TextInput from "../../components/TextInput";
import {Button, Form} from "react-bootstrap";
import {useForm} from "../../hooks/useForm";

const RegisterPage = () => {
    const initState = {
        values: {login: '', email: '', password: ''},
        errors: {}
    };

    const [formData, handleChange, handleSubmit] = useForm(initState)

    const {values, errors} = formData;

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
            type="email"
            name="email"
            value={values.email}
            error={errors.email}
            placeholder="Enter Email"
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
          <Button variant="info" type="submit">Sing Up</Button>
      </Form>
    )
}

export default RegisterPage;
