import * as React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../store/actions/auth.action";

import { Form, Button } from "react-bootstrap";
import TextInput from "../../components/TextInput";
import { useForm } from "../../hooks/useForm";

import "./Auth.scss";

const Login = ({ isAuthenticated, loginReq, loginSuccess, loginUser }) => {
    const history = useHistory();

    const initState = { values: { login: '', password: ''}, errors: {}};

    React.useEffect(() => {
        if (loginSuccess) {
            history.push('/');
        }
    }, [loginSuccess, history]);

    const [formData, handleChange, handleSubmit] = useForm(initState);

    const {values, errors} = formData;

    return (
      <Form className="form-auth" onSubmit={handleSubmit(loginUser)}>
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
          <Button variant="info" type="submit" disabled={loginReq}>Sing In</Button>
      </Form>
    )
};

const mapStateToProps = (state) => ({
    loginReq: state.auth.loginReq,
    isAuthenticated: state.auth.isAuthenticated,
    loginSuccess: state.auth.loginSuccess
});

export default connect(mapStateToProps, { loginUser })(
  Login
);
