import axios from 'axios';
import userTypes from '../types/auth.types';
import alertAction from './alert.action';

//Check token & load user
export const loadUser = () => (dispatch, getState) => {

    axios
      .get('/api/user/auth', tokenConfig(getState))
      .then(res =>
        dispatch({
            type: userTypes.USER_LOADED,
            payload: res.data
        })
      )
      .catch(_ => {
          dispatch({
              type: userTypes.RESET_STATE
          });
      });
}
//Register, Login & Logout user
export const loginUser = ({ login, password }) => {

    return dispatch => {

        dispatch({ type: userTypes.LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify({login, password});

        axios.post('/api/user/login', body, config)
          .then((res) => {
              dispatch({ type: userTypes.LOGIN_SUCCESS, payload: res.data })
              dispatch(alertAction.success('Login is success!'));
          })
          .catch((err) => {
              dispatch({ type: userTypes.LOGIN_FAILURE, payload: err.response.data.message });
              dispatch(alertAction.error(err.response.data.message));
              dispatch({ type: userTypes.RESET_STATE });
          });
    }
}

export const registerUser = ({login, email, password}) => {

    return (dispatch) => {

        dispatch({type: userTypes.REGISTER_REQUEST});

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const body = JSON.stringify({login, password, email});

        axios.post('/api/user/register', body, config)
          .then(res => {
                dispatch({type: userTypes.REGISTER_SUCCESS});
                dispatch(alertAction.success(res.data.message));
                dispatch({type: userTypes.RESET_STATE});
            }
          )
          .catch(err => {
              dispatch({
                  type: userTypes.REGISTER_FAILURE,
                  payload: err.response.data.message
              });
              dispatch(alertAction.error(err.response.data.message));
              dispatch({type: userTypes.RESET_STATE});
          });
    }
}

export const addAmount = ({login, amount}) => {

    return (dispatch, getState) => {

        const body = JSON.stringify({login, amount});

        axios.post('/api/user/balance/add', body, tokenConfig(getState))
            .then(res => {
                    dispatch({type: userTypes.USER_ADD_AMOUNT, payload: res.data.updatingUser});
                    dispatch(alertAction.success(res.data.message));
                }
            )
            .catch(err => {
                dispatch(alertAction.error(err.response.data.message));
            });
    }
}

export const logoutUser = () => ({
   type: userTypes.RESET_STATE
});

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
