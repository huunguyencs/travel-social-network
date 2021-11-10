import * as AUTH_TYPES from '../constants/authConstant';

export const loginStart = (props) => {
    return {
        type: AUTH_TYPES.LOGIN_START
    }
}

export const loginSuccess = (props) => {
    return {
        type: AUTH_TYPES.LOGIN_SUCCESS,
        payload: props,
    }
}

export const loginFail = (props) => {
    return {
        type: AUTH_TYPES.LOGIN_FAIL,
        payload: props,
    }
}

export const signupStart = (props) => {
    return {
        type: AUTH_TYPES.SIGNUP_START,
    }
}

export const signupSuccess = (props) => {
    return {
        type: AUTH_TYPES.SIGNUP_SUCCESS,
    }
}

export const signupFail = (props) => {
    return {
        type: AUTH_TYPES.SIGNUP_FAIL,
        payload: props,
    }
}

export const logout = (props) => {
    return {
        type: AUTH_TYPES.LOGOUT,
    }
}