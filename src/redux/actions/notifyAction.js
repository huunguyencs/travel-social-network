import * as NOTIFY_TYPES from '../constants/notifyConstant';

export const callStart = (props) => {
    return {
        type: NOTIFY_TYPES.CALL_START,
    }
}

export const callSuccess = (props) => {
    return {
        type: NOTIFY_TYPES.CALL_SUCCESS,
    }
}

export const callFail = (props) => {
    return {
        type: NOTIFY_TYPES.CALL_FAIL,
    }
}