import * as React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/auth.action";

import TextInput from "../../components/TextInput";
import {Button, Form} from "react-bootstrap";
import {useForm} from "../../hooks/useForm";

const RegisterPage = ({ registerReq = false, registerSuccess = false, registerUser }) => {
    const history = useHistory();

    const initState = {
        values: {login: '', email: '', password: ''},
        errors: {}
    };

    React.useEffect(() => {
        if (registerSuccess) {
            history.push('/login');
        }
    }, [registerSuccess, history])

    const [formData, handleChange, handleSubmit] = useForm(initState)

    const {values, errors} = formData;

    return (
      <Form className="form-auth" onSubmit={handleSubmit(registerUser)}>
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
          <Button variant="info" type="submit" disabled={registerReq}>Sing Up</Button>
      </Form>
    )
}

const mapStateToProps = (state) => ({
    registerReq: state.auth.registerReq,
    registerSuccess: state.auth.registerSuccess
});

export default connect(mapStateToProps, { registerUser })(
  RegisterPage
);
