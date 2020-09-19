import React from "react";
import {connect} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {loadOrderOne} from "../../store/actions/deal.action";
import {loadUser} from "../../store/actions/auth.action";
import dealTypes from "../../store/types/deal.types";
import socketIo from "socket.io-client";
import {Badge, Button, Col, Form, Row} from "react-bootstrap";
import TextInput from "../../components/TextInput";
import {useForm} from "../../hooks/useForm";
import {schemaFormOrderMessage} from "../../hooks/schems";
import { getVariant } from "../../hooks/helpers";

import state from "../../store";
import alertAction from "../../store/actions/alert.action";

const Message = ({author, message}) => {
    return (
        <div className="chat-message bg-dark">
            <div className="author">{author}</div>
            <div className="message">{message}</div>
        </div>
    )
}
const ENDPOINT = `http://localhost:5000/`;

let socket;

const Order = ({user, targetOrder, loadUser, loadOrderOne }) => {
    const history = useHistory();
    const {id} = useParams();

    React.useEffect(() => {

        loadOrderOne({id, login: user.login});

        socket = socketIo(ENDPOINT);

        socket.emit('join_to_order', {id});

        socket.on('order_updating', () => loadOrderOne({id, login: user.login}));

        socket.on('balance_update_seller', () => {
                user && loadUser();
        })

        socket.on('balance_update_buyer', () => {
                user && loadUser();
        })

        socket.on('error_pay', () => {
            state.dispatch(alertAction.error('Insufficient funds, top up balance'))
        });

        return () => {
            state.dispatch({ type: dealTypes.RESET_TARGET_ORDER});
            socket.disconnect();
        }

    }, [id, user, loadUser, loadOrderOne, history])

    const initState = {values: {message: ''}, errors: {}};

    const [formData, handleChange, handleSubmit] = useForm(initState, schemaFormOrderMessage);

    const {values, errors} = formData;

    const messageHandler = (message) => {
        socket.emit('order_message', {login: user.login, message, id})
    }

    /**
     * In a real project, such properties do not need to be written with spaces!
     * It is better to write them in a single line, for example 'status', or in camelCase: 'PaidUp'.
     */
    const ButtonBuyer = ({status, stepClick, cancelClick}) => {
        return (
            <>
                {status === 'Confirmation' &&
                <Row>
                    { (status === 'Confirmation' && targetOrder.initiator !== user.login) && <Col sm={6}><Button variant="primary" onClick={stepClick}>Accept deal</Button></Col> }
                    <Col sm={6}><Button variant="danger" onClick={cancelClick}>Canceled</Button></Col>
                </Row>
                }
                {status === 'Awaiting payment' &&
                <Row>
                    <Col sm={6}><Button variant="success" onClick={stepClick}>Pay In</Button></Col>
                    <Col sm={6}><Button variant="danger" onClick={cancelClick}>Cancel Deal</Button></Col>
                </Row>
                }
                {status === 'Paid up' &&
                <Row>
                    <Col sm={6}><Button variant="success" onClick={stepClick}>Confirm order</Button></Col>
                </Row>
                }
                {status === 'Completed' && null }
                {status === 'Canceled' && null }
            </>
        )
    }

    const ButtonSeller = ({status, stepClick, cancelClick}) => {
        return (
            <>
                {
                    status === 'Canceled' || status === 'Completed' || status === 'Paid up' ?
                        null :
                        <Row>
                            {(status === 'Confirmation' && targetOrder.initiator !== user.login) && <Col sm={6}><Button variant="primary" onClick={stepClick}>Accept deal</Button></Col>}
                            <Col sm={6}><Button variant="danger" onClick={cancelClick}>Cancel deal</Button></Col>
                        </Row>
                }
            </>
        )
    }

    const submitStepOrder = () => socket.emit('order_step');

    const submitCancelOrder = () => socket.emit('order_cancel', {id});

    return (
        <div className="order">
            {!targetOrder ? null :
                <>
                    <div className="order__info bg-dark">
                        <Badge className="order-status" variant={getVariant(targetOrder.status)}>{targetOrder.status}</Badge>
                        <span className="title">Order info</span>
                        <Row>
                            <Col sm={4}>Description</Col>
                            <Col sm={8}>{targetOrder.description}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4}>Seller</Col>
                            <Col sm={8}>{targetOrder.seller}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4}>Buyer</Col>
                            <Col sm={8}>{targetOrder.buyer}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4}>Tax</Col>
                            <Col sm={8}>{targetOrder.tax}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4}>Amount</Col>
                            <Col sm={8}>{targetOrder.orderAmount}</Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col sm={4}>Total amount</Col>
                            <Col sm={8}>{targetOrder.totalAmount}</Col>
                        </Row>
                        <hr/>
                        {
                            user.login === targetOrder.buyer ?
                                <ButtonBuyer status={targetOrder.status} stepClick={submitStepOrder} cancelClick={submitCancelOrder}/> :
                                <ButtonSeller status={targetOrder.status} stepClick={submitStepOrder} cancelClick={submitCancelOrder}/>
                        }
                    </div>
                    <div className="order__chat bg-dark">
                        <div className="chat__head">
                            <span className="title">Online chat</span>
                        </div>
                        <div className="chat__body">
                            {targetOrder.messages.map(({_id, author, message}) => {
                                return (
                                    <Message key={_id} author={author} message={message}/>
                                )
                            })}
                        </div>
                        <div className="chat__footer">
                            <Form onSubmit={handleSubmit(({message}, errors) => {
                                return !Object.keys(errors).length ? messageHandler(message) : false;
                            })}>
                                <TextInput
                                    className="chat-textarea"
                                    type="textarea"
                                    name="message"
                                    value={values.message}
                                    error={errors.message}
                                    placeholder="Please enter message..."
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <Button variant="info" type="submit">Send message</Button>
                            </Form>
                        </div>
                    </div>
                </>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    targetOrder: state.deals.currentOrder,
});

export default connect(mapStateToProps, {loadUser, loadOrderOne})(
    Order
);
