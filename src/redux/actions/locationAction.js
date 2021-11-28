import * as LOC_TYPES from '../constants/locationConstant';

export const getLocations = (props) => {
    return {
        type: LOC_TYPES.GET_LOCATION_LIST,
        payload: props,
    }
}

export const getLocationHot = (props) => {
    return {
        type: LOC_TYPES.GET_LOCATION_HOT,
        payload: props,
    }
}

export const loading = (props) => {
    return {
        type: LOC_TYPES.LOADING,
    }
}

export const error = (props) => {
    return {
        type: LOC_TYPES.ERROR,
        payload: props
    }
}