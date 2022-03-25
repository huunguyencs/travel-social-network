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

export const addServiceDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.ADD_SERVICE_DATE,
        payload: props
    }
}

export const updateServiceDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_SERVICE_DATE,
        payload: props
    }
}

export const deleteServiceDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.DELETE_SERVICE_DATE,
        payload: props
    }
}

export const addServiceLocation = (props) => {
    return {
        type: CREATE_TOUR_TYPES.ADD_SERVICE_LOCATION,
        payload: props
    }
}

export const updateServiceLocation = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_SERVICE_LOCATION,
        payload: props
    }
}

export const deleteServiceLocation = (props) => {
    return {
        type: CREATE_TOUR_TYPES.DELETE_SERVICE_LOCATION,
        payload: props
    }
}

export const loadTour = (props) => {
    return {
        type: CREATE_TOUR_TYPES.LOAD_TOUR,
        payload: props
    }
}

export const changeImage = (props) => {
    return {
        type: CREATE_TOUR_TYPES.CHANGE_IMAGE,
        payload: props
    }
}

export const updateDesciptionDate = (props) => {
    return {
        type: CREATE_TOUR_TYPES.UPDATE_DESCRIPTION_DATE,
        payload: props
    }
}