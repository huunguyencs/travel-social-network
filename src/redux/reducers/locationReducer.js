import * as LOC_TYPES from '../constants/locationConstant';

const INIT_STATE = {
    locations: [],
    provinces: [],
    services: [],
    hot: [],
    loadingProvinces: false,
    loadingLocations: false,
    loadingServices: false,
    error: null,
}


const locationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOC_TYPES.GET_PROVINCE_LIST: {
            return {
                ...state,
                provinces: action.payload.provinces,
                loadingProvinces: false,
            }
        }
        case LOC_TYPES.GET_LOCATION_LIST: {
            return {
                ...state,
                locations: action.payload.locations,
                loadingLocations: false,
            }
        }
        case LOC_TYPES.GET_SERVICE_LIST: {
            return {
                ...state,
                services: action.payload.services,
                loadingServices: false
            }
        }
        case LOC_TYPES.LOADING_LOCATIONS: { // loading danh sach dia diem hot
            return {
                ...state,
                loadingLocations: true,
            }
        }
        case LOC_TYPES.LOADING_PROVINCES: { // loading danh sach dia diem hot
            return {
                ...state,
                loadingProvinces: true,
            }
        }
        case LOC_TYPES.LOADING_SERVICES: {
            return {
                ...state,
                loadingServices: true
            }
        }
        default:
            return state
    }
}

export default locationReducer;