import * as CREATE_TOUR_TYPES from '../constants/createTourConstant'


export const createTour = (props) => {
    return {
        type: CREATE_TOUR_TYPES.CREATE_TOUR,
        payload: props,
    }
}


export const addDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.ADD_NEW_DATE,
        payload: props
    }
}

export const addLocation = (props) => {
    return {
        type: CREATE_TOUR_TYPES.ADD_NEW_LOCATION,
        payload: props
    }
}

export const deleteDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.DELETE_DATE,
        payload: props
    }
}

export const deleteLocation = (props) => {
    return {
        type: CREATE_TOUR_TYPES.DELETE_LOCATION,
        payload: props,
    }
}

export const updateDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_DATE,
        payload: props,
    }
}

export const updateLocation = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_LOCATION,
        payload: props,
    }
}

export const resetTour = (props) => {
    return {
        type: CREATE_TOUR_TYPES.RESET_TOUR,
        payload: null,
    }
}

export const updateInfo = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_INFO,
        payload: props,
    }
}

export const addService = (props) => {
    return {
        type: CREATE_TOUR_TYPES.ADD_SERVICE,
        payload: props
    }
}

export const updateService = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_SERVICE,
        payload: props
    }
}

export const deleteService = (props) => {
    return {
        type: CREATE_TOUR_TYPES.DELETE_SERVICE,
        payload: props
    }
}

export const loadTour = (props) => {
    return {
        type: CREATE_TOUR_TYPES.LOAD_TOUR,
        payload: props
    }
}