import alertTypes from '../types/alert.types';

export default {
    success: (message) => ({
        type: alertTypes.ALERT_SUCCESS,
        message
    }),
    warning: (message) => ({
        type: alertTypes.ALERT_WARNING,
        message
    }),
    error: (message) => ({
        type: alertTypes.ALERT_ERROR,
        message
    }),
    clear: () => ({
        type: alertTypes.ALERT_CLEAR
    })
}

