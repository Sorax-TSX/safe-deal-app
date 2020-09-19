import React from "react";
import {connect} from "react-redux";
import {createNewDeal} from "../../store/actions/deal.action";
import {useHistory} from "react-router-dom";

import {Button, Form} from "react-bootstrap";

import {schemaFormOrder} from "../../hooks/schems";
import {useForm} from "../../hooks/useForm";

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

const OrderCreate = React.memo(({login, createNewDeal, createSuccess = false}) => {
    const history = useHistory();

    const initState = {
        values: {
            description: '',
            initiator: login,
            partner: '',
            role: 'seller',
            amount: ''
        },
        errors: {},
    };

    const [formData, handleChange, handleSubmit] = useForm(initState, schemaFormOrder);

    const {values, errors} = formData;

    const allFields = checkAllFields(values);

    React.useEffect(() => {
        if (createSuccess) {
            history.push('/deals')
        }
    }, [createSuccess, history])

    return (
        <div className="order-create bg-dark">
            <Form className="order-create__form" onSubmit={handleSubmit((form, errors) => {
                return !Object.keys(errors).length ? createNewDeal(form) : false;
            })}>
                <TextInput
                    label="Order Name"
                    type="text"
                    name="description"
                    value={values.description}
                    error={errors.description}
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
                        name="role"
                        id="formOrderCreate1"
                        onChange={handleChange}
                        checked={values.role === 'seller'}
                    />
                    <CheckedButton
                        type="radio"
                        label="Buyer"
                        value="buyer"
                        name="role"
                        id="formOrderCreate2"
                        onChange={handleChange}
                        checked={values.role === 'buyer'}
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

const mapStateToProps = state => ({
    login: state.auth.user.login,
    createSuccess: state.deals.createSuccess
});

export default connect(mapStateToProps, {createNewDeal})(
    OrderCreate
);
