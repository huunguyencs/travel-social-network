import * as USER_TYPES from '../constants/userConstant';

export const getUserInfo = (props) => {
    return {
        type: USER_TYPES.GET_USER_INFO,
        payload: props
    }
}

export const follow = (props) => {
    return {
        type: USER_TYPES.FOLLOW,
        payload: props
    }
}

export const unfollow = (props) => {
    return {
        type: USER_TYPES.UNFOLLOW,
        payload: props
    }
}