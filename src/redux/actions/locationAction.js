import * as LOC_TYPES from '../constants/locationConstant';

export const getProvinces = (props) => {
    return {
        type: LOC_TYPES.GET_PROVINCE_LIST,
        payload: props
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