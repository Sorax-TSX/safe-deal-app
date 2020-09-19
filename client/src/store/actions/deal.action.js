import axios from 'axios';
import dealTypes from '../types/deal.types';
import alertAction from './alert.action';
import {tokenConfig} from "./auth.action";

export const loadDealsList = ({login}) => (dispatch, getState) => {
    axios.get(`/api/deal/list/${login}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: dealTypes.DEALS_LOAD_LIST,
                payload: res.data.orderList
            })
        )
        .catch(_ => {
            dispatch({
                type: dealTypes.RESET_STATE
            });
        });
}

export const loadOrderOne = ({id, login}) => {
    return (dispatch, getState) => {
        axios.get(`/api/deal/order/${id}&${login}`, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: dealTypes.DEAL_LOAD_ONE,
                    payload: res.data.currentOrder
                })
            })
            .catch(_ => {
                dispatch({
                    type: dealTypes.RESET_STATE
                })
            });
    }
}

export const createNewDeal = ({description, initiator, partner, role, amount}) => {
    return (dispatch, getState) => {
        const body = JSON.stringify({description, initiator, partner, role, amount});
        axios
            .post(`/api/deal/new`, body, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: dealTypes.DEAL_CREATE,
                    payload: res.data.order
                })
                dispatch(alertAction.success("Order has been created!"))
            })
            .catch((err) => {
                dispatch(alertAction.error(err.response.data.message))
            });
    }
}