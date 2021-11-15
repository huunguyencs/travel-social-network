import * as AUTH_TYPES from "../constants/authConstant"

export const auth = (props) => {
    return {
        type: AUTH_TYPES.AUTH,
        payload: props,
    }
}

export const logout = (prop) => {
    return {
        type: AUTH_TYPES.LOGOUT,
    }
}
