import * as ALERT_TYPES from '../constants/alertConstant';

export const loading = (props) => {
    return {
        type: ALERT_TYPES.LOADING,
    }
}

export const success = (props) => {
    return {
        type: ALERT_TYPES.SUCCESS,
        payload: props,
    }
}

export const error = (props) => {
    return {
        type: ALERT_TYPES.ERROR,
        payload: props,
    }
}

export const reset = (props) => {
    return {
        type: ALERT_TYPES.RESET,
        payload: props,
    }
}

