import React from "react";
import { Form, Button } from "react-bootstrap";
import TextInput from "../../components/TextInput";

import "./Balance.scss";
import {useForm} from "../../hooks/useForm";

const Balance = () => {
    const initState = { values: { amount: 0 }, errors: {}};

    const [formData, handleChange, handleSubmit] = useForm(initState);

    const {values, errors} = formData;
    return (
      <div className="balance bg-dark">
          <h3 className="balance__title">Financial Cabinet</h3>
          <hr/>
          <div className="balance__block">
              <span className="balance-amount">Current amount: 5000 USD</span>
              <Form className="form-balance">
                  <TextInput
                    type="text"
                    name="login"
                    value={values.amount}
                    error={errors.amount}
                    placeholder="Login"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <Button variant="info" type="submit">Add amount</Button>
              </Form>
          </div>
      </div>
    )
}

export default Balance;
