import { combineReducers } from "redux";
import authReducer from './auth.reducer';
import alertReducer from './alert.reducer'
import dealReducer from  './deal.reducer';

export default combineReducers({
    auth: authReducer,
    deals: dealReducer,
    alert: alertReducer
})