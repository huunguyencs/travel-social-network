import * as USER_TYPES from '../constants/userConstant';

export const getRate = (props) => {
    return {
        type: USER_TYPES.GET_RATE,
        payload: props
    }
}

export const reviewService = (props) => {
    return {
        type: USER_TYPES.REVIEW_SERVICE,
        payload: props
    }
}