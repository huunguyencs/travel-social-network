import * as TOUR_TYPES from '../constants/tourConstant';

export const getTours = (props) => {
    return {
        type: TOUR_TYPES.GET_TOURS,
        payload: props,
    }
}

export const addTour = (props) => {
    return {
        type: TOUR_TYPES.ADD_TOUR,
        payload: props,
    }
}

export const updateTour = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_TOUR,
        payload: props,
    }
}

export const deleteTour = (props) => {
    return {
        type: TOUR_TYPES.DELETE_TOUR,
        payload: props,
    }
}

export const loading = (props) => {
    return {
        type: TOUR_TYPES.LOADING,
        payload: props,
    }
}

export const error = (props) => {
    return {
        type: TOUR_TYPES.ERROR,
        payload: props,
    }
}

export const updateLike = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_LIKE,
        payload: props,
    }
}

export const updateJoin = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_JOIN,
        payload: props,
    }
}

export const getTourDetail = (props) => {
    return {
        type: TOUR_TYPES.GET_TOUR_DETAIL,
        payload: props,
    }
}