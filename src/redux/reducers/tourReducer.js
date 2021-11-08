import * as TOUR_TYPES from '../constants/tourConstant';

const initState = {
    tour: []
}


const tourReducer = (state = initState, action) => {
    switch (action.type) {
        case TOUR_TYPES.ADD_NEW_DATE: {
            return {
                ...state,
                tour: [action.payload.newDate, ...state.tour]
            }
        }
        case TOUR_TYPES.ADD_NEW_LOCATION: {
            const { newLocation } = action.payload.newLocation;
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? [
                    ...date, newLocation
                ] : date)
            }
        }
        case TOUR_TYPES.DELETE_DATE: {
            return {
                ...state,
                tour: [
                    ...state.tour.slice(0, action.payload.indexDate),
                    ...state.tour.slice(action.payload.indexDate + 1)
                ]
            }
        }
        case TOUR_TYPES.DELETE_LOCATION: {
            return {
                ...state,
                tour: state.tour.map((date, i) => i === action.payload.indexDate ? [
                    ...date.slice(0, action.payload.indexLocation),
                    ...date.slice(action.payload.indexLocation + 1)
                ] : date)
            }
        }
        case TOUR_TYPES.RESET_TOUR: {
            return {
                ...state,
                tour: []
            }
        }
        default: {
            return state
        }
    }
}

export default tourReducer;
