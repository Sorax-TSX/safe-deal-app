import React from "react";
import { Button, Form } from "react-bootstrap";

import {schemaFormOrder} from "../../hooks/schems";
import { useForm } from "../../hooks/useForm";

import TextInput from "../../components/TextInput";
import CheckedButton from "../../components/CheckedButton";

const checkAllFields = (data) => {
    const values = Object.values(data);
    for (const val of values) {
        if (val.length < 3) {
            return false;
        }
    }

    return true;
}

const OrderCreate = React.memo(() => {
    const initState = {
        values: {
            name: '',
            partner: '',
            initiator: 'seller',
            amount: ''
        },
        errors: {},
    };

    const [formData, handleChange, handleSubmit] = useForm(initState, schemaFormOrder);

    const { values, errors } = formData;

    const allFields = checkAllFields(values);

    return (
          <div className="order-create bg-dark">
              <Form className="order-create__form" onSubmit={handleSubmit((form, errors) => {
                  return !Object.keys(errors).length ? console.log(form) : false;
              })}>
                  <TextInput
                    label="Order Name"
                    type="text"
                    name="name"
                    value={values.name}
                    error={errors.name}
                    placeholder="Order Name"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <hr/>
                  <TextInput
                    label="Partner Name"
                    type="text"
                    name="partner"
                    value={values.partner}
                    error={errors.partner}
                    placeholder="Partner Name"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <hr/>
                  <Form.Label>Your Role</Form.Label>
                  <div className="order-create__radio">
                      <CheckedButton
                        type="radio"
                        label="Seller"
                        value="seller"
                        name="initiator"
                        id="formOrderCreate1"
                        onChange={handleChange}
                        checked={values.initiator === 'seller'}
                      />
                      <CheckedButton
                        type="radio"
                        label="Buyer"
                        value="buyer"
                        name="initiator"
                        id="formOrderCreate2"
                        onChange={handleChange}
                        checked={values.initiator === 'buyer'}
                      />
                  </div>
                  <hr/>
                  <TextInput
                    label="Amount + 5% tax"
                    type="partner"
                    name="amount"
                    value={values.amount}
                    error={errors.amount}
                    placeholder="Amount"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <hr/>
                  <Button variant="info" type="submit" disabled={!allFields}>Create order</Button>
              </Form>
          </div>
    )
});

export default OrderCreate;
