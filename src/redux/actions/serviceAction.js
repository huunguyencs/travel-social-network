import * as USER_TYPES from '../constants/userConstant';

export const getDetail = (props) => {
    return {
        type: USER_TYPES.GET_DETAIL,
        payload: props
    }
}

export const reviewService = (props) => {
    return {
        type: USER_TYPES.REVIEW_SERVICE,
        payload: props
    }
}

export const addService = (props) => {
    return {
        type: USER_TYPES.ADD_SERVICE,
        payload: props
    }
}