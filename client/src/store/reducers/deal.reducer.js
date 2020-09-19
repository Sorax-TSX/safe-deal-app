import dealTypes from "../types/deal.types";

const initialState = {
    currentOrder: null,
    loading: false,
    orders: []
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case dealTypes.DEAL_LOADING:
            return {
                ...state,
                loading: true
            }
        case dealTypes.DEALS_LOAD_LIST:
            return {
                ...state,
                loading: false,
                orders: payload
            }
        case dealTypes.DEAL_CREATE: {
            return {
                ...state,
                targetDeal: payload,
                createSuccess: true
            }
        }
        case dealTypes.DEAL_LOAD_ONE:
        case dealTypes.DEAL_STEP:
            return {
                ...state,
                currentOrder: payload
            }
        case dealTypes.RESET_TARGET_ORDER: {
            return {
                ...state,
                currentOrder: null
            }
        }
        case dealTypes.RESET_STATE:
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}
