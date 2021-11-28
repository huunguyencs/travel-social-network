import * as TOUR_TYPES from '../constants/tourConstant';

const INIT_STATE = {
    tours: [],
    loading: false,
    error: null,
}

const tourReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOUR_TYPES.GET_TOURS: {
            return {
                ...state,
                tours: action.payload.tour,
                loading: false,
                error: null,
            }
        }
        case TOUR_TYPES.CREATE_TOUR: {
            return {
                ...state,
                tour: [
                    action.payload.tour,
                    ...state.tour,
                ],
                error: null
            }
        }
        case TOUR_TYPES.DELETE_TOUR: {
            return {
                ...state,
                tour: state.tour.filter(tour => tour.id !== action.payload.id),
                error: null,
            }
        }
        case TOUR_TYPES.LOADING: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case TOUR_TYPES.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        }
        default: {
            return state
        }
    }
}

export default tourReducer;