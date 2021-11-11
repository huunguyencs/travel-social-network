import * as LOC_TYPES from '../constants/locationConstant';

const INIT_STATE = {
    locations: [],
    hot: [],
    loading: false,
    error: null,
}


const locationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOC_TYPES.GET_LOCATION_LIST: { // lay danh sach de chon dia diem trong luc tao tour
            return {
                ...state,
                locations: action.payload.location
            }
        }
        case LOC_TYPES.GET_LOCATION_HOT: { // lay danh sach cac dia diem hot
            return {
                ...state,
                hot: action.payload.hot,
                error: null,
            }
        }
        case LOC_TYPES.LOADING: { // loading danh sach dia diem hot
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case LOC_TYPES.ERROR: { // loi trong load danh sach dia diem hot
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        default:
            return state
    }
}

export default locationReducer;