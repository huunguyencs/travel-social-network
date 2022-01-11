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

export const updateFollowing = (props) => {
    return {
        type: AUTH_TYPES.UPDATE_FOLLOWING,
        payload: props
    }
}

export const updateInfo = (props) => {
    return {
        type: AUTH_TYPES.UPDATE_INFO,
        payload: props
    }
}