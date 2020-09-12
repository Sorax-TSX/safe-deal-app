import userTypes from '../types/auth.types'

const initialState = {
    loadUser: true,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    user: null
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case userTypes.USER_LOADED:
            return {
                ...state,
                loadUser: false,
                isAuthenticated: true,
                user: payload
            };
        case userTypes.REGISTER_REQUEST:
            return {
                ...state,
                registerReq: true
            };
        case userTypes.REGISTER_SUCCESS:
            return {
                ...state,
                registerReq: false,
                registerSuccess: true
            };
        case userTypes.REGISTER_FAILURE:
            return {
                ...state,
                registerReq: false
            };
        case userTypes.LOGIN_REQUEST:
            return {
                ...state,
                loginReq: true
            }
        case userTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loginReq: false,
                isAuthenticated: true
            }
        case userTypes.LOGIN_FAILURE:
            return {
                ...state,
                loginReq: false
            }
        case userTypes.RESET_STATE:
            localStorage.removeItem('token')
            return {
                ...initialState,
                loadUser: false,
                token: null
            };
        default:
            return state;
    }
}
