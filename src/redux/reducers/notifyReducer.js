import * as NOTIFY_TYPES from '../constants/notifyConstant';

const INIT_STATE = {
    loading: false,
    success: false,
    error: null,
    message: "",
}

const notifyReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.CALL_START: { // bat dau goi api
            return {
                ...state,
                loading: true,
                success: false,
                message: "",
            }
        }
        case NOTIFY_TYPES.CALL_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                message: action.payload.message,
            }
        }
        case NOTIFY_TYPES.CALL_FAIL: {
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload.error,
                message: "",
            }
        }
        default: {
            return state
        }
    }
}

export default notifyReducer;