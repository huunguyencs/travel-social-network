import * as NOTIFY_TYPES from '../constants/notifyConstant';

const INIT_STATE = {
    isFetching: false,
    success: false,
    error: null,
}

const notifyReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.CALL_START: { // bat dau goi api
            return {
                ...state,
                isFetching: true,
            }
        }
        case NOTIFY_TYPES.CALL_SUCCESS: { // goi api thanh cong
            return {
                ...state,
                isFetching: false,
                success: true,
                error: null,
            }
        }
        case NOTIFY_TYPES.CALL_FAIL: { // goi api that bai
            return {
                ...state,
                isFetching: false,
                success: false,
                error: action.payload.error,
            }
        }
        default: {
            return state
        }
    }
}

export default notifyReducer;