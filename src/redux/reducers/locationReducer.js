import * as LOC_TYPES from '../constants/locationConstant';

const INIT_STATE = {
    locations: [],
    provinces: [],
    hot: [],
    loading: false,
    error: null,
}


const locationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOC_TYPES.GET_PROVINCE_LIST: {
            return {
                ...state,
                provinces: action.payload.provinces
            }
        }
        case LOC_TYPES.LOADING_LOCATION: { // loading danh sach dia diem hot
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case LOC_TYPES.ERROR_LOCATION: { // loi trong load danh sach dia diem hot
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