
import * as POST_TYPES from '../constants/postConstant';
import * as TOUR_TYPES from '../constants/tourConstant';

export const updateCommentPost = (props) => {
    return {
        type: POST_TYPES.UPDATE_COMMENT,
        payload: props
    }
}

export const updateCommentTour = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_COMMENT,
        payload: props,
    }
}

export const addCommentPost = (props) => {
    return {
        type: POST_TYPES.ADD_COMMENT,
        payload: props,
    }
}

export const addCommentTour = (props) => {
    return {
        type: TOUR_TYPES.ADD_COMMENT,
        payload: props,
    }
}

export const deleteCommentPost = (props) => {
    return {
        type: POST_TYPES.DELETE_COMMENT,
        payload: props
    }
}

export const deleteCommentTour = (props) => {
    return {
        type: TOUR_TYPES.DELETE_COMMENT,
        payload: props
    }
}