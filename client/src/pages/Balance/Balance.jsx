import React from "react";
import { connect } from "react-redux";
import { addAmount } from "../../store/actions/auth.action";
import { Form, Button } from "react-bootstrap";
import TextInput from "../../components/TextInput";
import { useForm } from "../../hooks/useForm";
import { schemaFormBalance } from "../../hooks/schems";

import "./Balance.scss";


const Balance = ({ user, addAmount }) => {

    const initState = { values: { amount: '' }, errors: {}};

    const [formData, handleChange, handleSubmit] = useForm(initState, schemaFormBalance);

    const {values, errors} = formData;
    return (
      <div className="balance bg-dark">
          <h3 className="balance__title">Financial Cabinet</h3>
          <hr/>
          <div className="balance__block">
              <span className="balance-amount">Current amount: {user.amount} USD</span>
              <Form className="form-balance" onSubmit={handleSubmit((form, errors) => {
                  return !Object.keys(errors).length ? addAmount({...form, login: user.login}) : false;
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

const mapStateToProps = (state) => ({
   user: state.auth.user
});


export default connect(mapStateToProps, { addAmount })(
    Balance
);
