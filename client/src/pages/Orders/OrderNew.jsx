import React from "react";
import { Button, Form } from "react-bootstrap";

import { useForm } from "../../hooks/useForm";

import TextInput from "../../components/TextInput";
import CheckedButton from "../../components/CheckedButton";

const OrderCreate = () => {
    const initState = {
        values: {
            name: '',
            partner: '',
            role: {
                seller: true,
                buyer: false,
            },
            amount: 0,
            tax: 5
        },
        errors: {}
    };

    console.log(initState)

    const [formData, handleChange, handleSubmit] = useForm(initState);

    const { values, errors } = formData;

    return (
          <div className="order-create bg-dark">
              <Form className="order-create__form">
                  <TextInput
                    label="Order Name"
                    type="text"
                    name="name"
                    value={values.name}
                    error={errors.name}
                    placeholder="Order Name"
                    autoComplete="off"
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
                  />
                  <hr/>
                  <Form.Label>Your Role</Form.Label>
                  <div className="order-create__radio">
                      <CheckedButton
                        type="radio"
                        label="Seller"
                        value="seller"
                        name="formOrderCreate"
                        id="formOrderCreate1"
                      />
                      <CheckedButton
                        type="radio"
                        label="Buyer"
                        value="buyer"
                        name="formOrderCreate"
                        id="formOrderCreate2"
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
                  />
                  <hr/>
                  <Button variant="info" type="submit" >Create order</Button>
              </Form>
          </div>
    )
}

export default OrderCreate;
