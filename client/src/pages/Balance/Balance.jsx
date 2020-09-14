import React from "react";
import { Form, Button } from "react-bootstrap";
import TextInput from "../../components/TextInput";
import { useForm } from "../../hooks/useForm";
import { schemaFormBalance } from "../../hooks/schems";

import "./Balance.scss";


const Balance = () => {
    const initState = { values: { amount: '' }, errors: {}};

    const [formData, handleChange, handleSubmit] = useForm(initState, schemaFormBalance);

    const {values, errors} = formData;
    return (
      <div className="balance bg-dark">
          <h3 className="balance__title">Financial Cabinet</h3>
          <hr/>
          <div className="balance__block">
              <span className="balance-amount">Current amount: 5000 USD</span>
              <Form className="form-balance" onSubmit={handleSubmit((form, errors) => {
                  return !Object.keys(errors).length ? console.log(form) : false;
              })}>
                  <TextInput
                    type="text"
                    name="amount"
                    value={values.amount}
                    error={errors.amount}
                    placeholder="Amount"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <Button variant="info" type="submit">Add amount</Button>
              </Form>
          </div>
      </div>
    )
};

export default Balance;
