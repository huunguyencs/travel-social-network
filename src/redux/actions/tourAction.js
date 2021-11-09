import * as TOUR_TYPES from '../constants/tourConstant'


export const createTour = (props) => {
    return {
        type: TOUR_TYPES.ADD_TOUR,
        payload: props,
    }
}

export const addDate = (props) => {
    return {
        type: TOUR_TYPES.ADD_NEW_DATE,
        payload: props
    }
}

export const addLocation = (props) => {
    return {
        type: TOUR_TYPES.ADD_NEW_LOCATION,
        payload: props
    }
}

export const deleteDate = (props) => {
    return {
        type: TOUR_TYPES.DELETE_DATE,
        payload: props
    }
}

export const deleteLocation = (props) => {
    return {
        type: TOUR_TYPES.DELETE_LOCATION,
        payload: props,
    }
}

export const updateDate = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_DATE,
        payload: props,
    }
}

export const updateLocation = (props) => {
    return {
        type: TOUR_TYPES.UPDATE_LOCATION,
        payload: props,
    }
}

export const resetTour = (props) => {
    return {
        type: TOUR_TYPES.RESET_TOUR,
        payload: null,
    }
}

export const saveTour = (props) => async (dispatch) => {
    // call api to save data to database

    // reset tour

}
