import * as AUTH_TYPES from '../constants/authConstant';

const INIT_STATE = {
    user: null,
    isFetching: false,
    error: null,
    success: false,
}

const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTH_TYPES.LOGIN_START: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case AUTH_TYPES.LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.payload.user,
                isFetching: false,
                success: true,
            }
        }
        case AUTH_TYPES.LOGIN_FAIL: {
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                success: false,
            }
        }
        case AUTH_TYPES.SIGNUP_START: {
            return {
                ...state,
                isFetching: true,
            }
        }
        case AUTH_TYPES.SIGNUP_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                success: true,
            }
        }
        case AUTH_TYPES.SIGNUP_FAIL: {
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                success: false,
            }
        }
        case AUTH_TYPES.LOGOUT: {
            return {
                ...state,
                user: null,
                success: false,
            }
        }
        default:
            return state

    }
}