import * as USER_TYPES from '../constants/userConstant';

export const getUserInfo = (props) => {
    return {
        type: USER_TYPES.GET_USER_INFO,
        payload: props
    }
}

export const updateFollower = (props) => {
    return {
        type: USER_TYPES.UPDATE_FOLLOW,
        payload: props
    }
}

export const getServices = (props) => {
    return {
        type: USER_TYPES.GET_SERVICES,
        payload: props
    }
}