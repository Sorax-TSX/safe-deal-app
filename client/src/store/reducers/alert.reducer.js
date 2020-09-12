import alertType from '../types/alert.types';

export default (state = {}, { type, message }) => {
    switch (type) {
        case alertType.ALERT_SUCCESS:
            return {
                type: 'success',
                message
            }
        case alertType.ALERT_ERROR:
            return {
                type: 'error',
                message
            }
        case alertType.ALERT_WARNING:
            return {
                type: 'warning',
                message
            }
        case alertType.ALERT_CLEAR:
            return {}
        default:
            return state;
    }
}